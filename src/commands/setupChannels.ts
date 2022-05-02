import { SlashCommandBuilder } from '@discordjs/builders';
import {
	CommandInteraction,
	Message,
	MessageActionRow,
	MessageButton,
	MessageComponentInteraction,
	MessageManager,
	MessageSelectMenu,
} from 'discord.js';

import { handleInteractionError, isGuild } from '../helper';
import { InteractionErrorCodes } from '../types';

const CMD_NAME = 'setup-channels';
const READ_CHANNEL_ID = 'channel-read';
const WRITE_CHANNEL_ID = 'channel-write';
const BUTTON_FINISH_ID = 'button-finish';

export default {
	data: new SlashCommandBuilder()
		.setName(CMD_NAME)
		.setDescription(
			'Configures the channels the bot uses to get merchant locations and send out pings.',
		),
	async execute(interaction: CommandInteraction) {
		const { logger, db } = interaction.client;
		await interaction.deferReply();
		if (!interaction.isCommand) return;

		// Error handling
		if (
			!(await handleInteractionError(
				{
					replyType: 'EDIT_REPLY',
					interaction,
					logger: logger,
				},
				[
					InteractionErrorCodes.INTERACTION_NO_CHANNEL,
					InteractionErrorCodes.INTERACTION_NO_GUILD,
					InteractionErrorCodes.INTERACTION_NO_GUILDID,
				],
			)) ||
			!interaction.guild ||
			!interaction.guildId ||
			!interaction.channel
		) {
			return;
		}

		// DB error handling
		const guildData = await db.get(interaction.guildId, {
			replyType: 'EDIT_REPLY',
			interaction,
			logger: logger,
		});
		if (!isGuild(guildData)) {
			return;
		}

		// Create the select menus
		let readSet = false;
		let writeSet = false;
		const readMenu = new MessageSelectMenu()
			.setCustomId(READ_CHANNEL_ID)
			.setPlaceholder(
				'Select the channel where Saint Bot sends updates,',
			);
		const writeMenu = new MessageSelectMenu()
			.setCustomId(WRITE_CHANNEL_ID)
			.setPlaceholder('Select the channel where pings should be sent,');
		const finishButton = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId(BUTTON_FINISH_ID)
				.setLabel('Finish')
				.setStyle('DANGER'),
		);

		// Obtain the guild's channels and load them into the select menus
		const channels = interaction.guild.channels.cache
			.filter((channel) => channel.isText())
			.map((channel) => ({ id: channel.id, name: channel.name }));
		channels?.forEach((channel) => {
			readMenu.addOptions({
				label: channel.name,
				value: channel.id,
				default: guildData?.readChannelId === channel.id ? true : false,
			});
			writeMenu.addOptions({
				label: channel.name,
				value: channel.id,
				default:
					guildData?.writeChannelId === channel.id ? true : false,
			});
		});
		// Create the replie's rows and send the message
		const readRow = new MessageActionRow().addComponents(readMenu);
		const writeRow = new MessageActionRow().addComponents(writeMenu);
		await interaction.editReply({
			content: 'Please select the channels to be used by the bot.',
			components: [readRow, writeRow, finishButton],
		});

		const collector = interaction.channel
			.createMessageComponentCollector({
				filter: (i: MessageComponentInteraction) => {
					return (
						i.user.id === interaction.user.id &&
						i.channelId === interaction.channelId
					);
				},
				time: 60000,
			})
			.on('collect', async (i) => {
				if (
					!handleInteractionError(
						{
							replyType: 'REPLY',
							ephemeral: true,
							interaction: interaction,
							logger: logger,
						},
						[InteractionErrorCodes.INTERACTION_NO_GUILDID],
					) ||
					!interaction.guildId
				) {
					return;
				}
				if (i.isSelectMenu()) {
					if (i.customId === READ_CHANNEL_ID) {
						readSet = true;
						const components = [];
						if (!writeSet) {
							components.push(writeRow);
						}
						components.push(finishButton);
						i.update({
							content:
								'The read channel was successfully updated.',
							components,
						});
						await db.update(
							interaction.guildId,
							{ readChannelId: i.values[0] },
							{ replyType: 'UPDATE', interaction: i, logger },
						);
						if (readSet) {
							collector.stop();
							if ((i.message as Message).deletable) {
								await (i.message as Message).delete();
							}
						}
					} else if (i.customId === WRITE_CHANNEL_ID) {
						writeSet = true;
						const components = [];
						if (!readSet) {
							components.push(readRow);
						}
						components.push(finishButton);
						i.update({
							content:
								'The write channel was successfully updated.',
							components,
						});
						await db.update(
							interaction.guildId,
							{ writeChannelId: i.values[0] },
							{ replyType: 'UPDATE', interaction: i, logger },
						);
						if (readSet) {
							collector.stop();
							if ((i.message as Message).deletable) {
								await (i.message as Message).delete();
							}
						}
					}
				} else if (i.isButton()) {
					if (i.customId === BUTTON_FINISH_ID) {
						if ((i.message as Message).deletable) {
							await (i.message as Message).delete();
						}
						collector.stop();
					}
				}
			});
	},
};
