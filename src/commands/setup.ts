import { SlashCommandBuilder } from '@discordjs/builders';
import {
	CommandInteraction,
	MessageActionRow,
	MessageButton,
	MessageComponentInteraction,
	MessageSelectMenu,
} from 'discord.js';

import Client from '../service/Client';
import Flag, { Flags } from '../types/flags';

/**
 * @summary Phase 1: determine how to create the roles
 *
 * Option A) Automated role creation
 *
 * Option B) Manual role creation
 * @param interaction - interaction that prompted the event
 */
const phaseOne = async (interaction: CommandInteraction) => {
	const row = new MessageActionRow().addComponents([
		new MessageButton()
			.setCustomId('role-automatic')
			.setLabel('Do it for me')
			.setStyle('PRIMARY'),
		new MessageButton()
			.setCustomId('role-manual')
			.setLabel("I'll do it myself (WIP)")
			.setStyle('PRIMARY'),
	]);
	await interaction.editReply({
		content:
			'Should I create the roles to ping myself, or would you like to add them manualy?',
		components: [row],
	});
};

/**
 * Phase Two A: User wants to automate role creation
 * @param i - interaction of the button which prompted this phase
 */
const phaseTwoA = async (i: MessageComponentInteraction) => {
	await i.reply({
		content: 'Ok, creating roles now...',
		components: [],
		ephemeral: true,
	});

	const guild = await Client.getInstance().get(i.guildId ?? '');
	guild?.weiId && i.guild?.roles.delete(guild.weiId);
	guild?.mokamokaId && i.guild?.roles.delete(guild.mokamokaId);
	guild?.sieraId && i.guild?.roles.delete(guild.sieraId);
	guild?.rapportId && i.guild?.roles.delete(guild.rapportId);

	const weiId = (
		await i.guild?.roles.create({ name: 'Wei', mentionable: true })
	)?.id;
	const sieraId = (
		await i.guild?.roles.create({ name: 'Siera', mentionable: true })
	)?.id;
	const mokamokaId = (
		await i.guild?.roles.create({ name: 'Mokamoka', mentionable: true })
	)?.id;
	const rapportId = (
		await i.guild?.roles.create({
			name: 'Legendary Rapport',
			mentionable: true,
		})
	)?.id;
	const success = weiId && sieraId && mokamokaId && rapportId;

	if (i.guildId && success) {
		const priorFlag =
			(await Client.getInstance().get(i.guildId))?.setupFlags ?? 0;
		const resetFlag = Flag.remove(
			priorFlag,
			Flags.SETUP_CHANNEL,
			Flags.SETUP_ROLE,
		);
		await Client.getInstance().update(i.guildId, {
			weiId: weiId,
			mokamokaId: mokamokaId,
			sieraId: sieraId,
			rapportId: rapportId,
			setupFlags: Flag.create(resetFlag, Flags.SETUP_ROLE),
		});
		await i.editReply({
			content: `Successfully created roles`,
		});
		await phaseThree(i);
	} else {
		await i.editReply({
			content: `Failed to create roles. Try again later`,
		});
	}
};

/**
 * Phase 3 - Determine the read channel
 * @param i
 */
const phaseThree = async (i: MessageComponentInteraction) => {
	const channels = i.guild?.channels.cache
		.filter((channel) => channel.isText())
		.map((channel) => ({ id: channel.id, name: channel.name }));
	const menu = new MessageSelectMenu()
		.setCustomId('channel-read')
		.setPlaceholder('Please select a channel');
	channels?.forEach((channel) =>
		menu.addOptions({ label: channel.name, value: channel.id }),
	);
	const row = new MessageActionRow().addComponents(menu);
	const a = await i.followUp({
		content: 'Which channel contains the merchant updates?',
		components: [row],
		ephemeral: true,
	});
};

/**
 * Phase 3 - Determine the write channel
 * @param i
 */
const phaseFour = async (i: MessageComponentInteraction) => {
	const channels = i.guild?.channels.cache
		.filter((channel) => channel.isText())
		.map((channel) => ({ id: channel.id, name: channel.name }));
	const menu = new MessageSelectMenu()
		.setCustomId('channel-write')
		.setPlaceholder('Please select a channel');
	channels?.forEach((channel) =>
		menu.addOptions({ label: channel.name, value: channel.id }),
	);
	const row = new MessageActionRow().addComponents(menu);
	const a = await i.followUp({
		content: 'Which channel should the pings be sent?',
		components: [row],
		ephemeral: true,
	});
};

export default {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Configures the bot to function on your server'),
	async execute(interaction: CommandInteraction) {
		if (!interaction.isCommand) return;
		try {
			await interaction.deferReply({ ephemeral: true });
			console.log(`(A): ${interaction.id} / ${interaction.deferred}`);
			interaction.channel
				?.createMessageComponentCollector({
					filter: (i: MessageComponentInteraction) => {
						return (
							i.user.id === interaction.user.id &&
							i.channelId === interaction.channelId
						);
					},
					time: 60000,
				})
				.on('collect', async (i) => {
					console.log(i.customId);

					if (i.isButton()) {
						if (i.customId === 'role-automatic') {
							console.log('Automatic!');
							await phaseTwoA(i);
						} else if (i.customId === 'role-manual') {
							console.log('Manual!');
							await i.reply({
								content:
									'This feature is currently in development!',
								ephemeral: true,
							});
						}
					} else if (i.isSelectMenu()) {
						if (i.customId === 'channel-read') {
							if (i.guildId && i.values.length > 0) {
								Client.getInstance().update(i.guildId, {
									readChannelId: i.values[0],
								});
								await i.reply({
									content: 'Read channel saved successfully',
									ephemeral: true,
								});
								await phaseFour(i);
							} else {
								await i.reply({
									content:
										'Something went wrong. Please try again later',
									ephemeral: true,
								});
							}
						} else if (i.customId === 'channel-write') {
							if (i.guildId && i.values.length > 0) {
								const priorFlags =
									(await Client.getInstance().get(i.guildId))
										?.setupFlags ?? 0;
								Client.getInstance().update(i.guildId, {
									writeChannelId: i.values[0],
									setupFlags: Flag.create(
										priorFlags,
										Flags.SETUP_CHANNEL,
									),
								});
								await i.reply({
									content:
										'Write channel saved successfully. The setup is now complete',
									ephemeral: true,
								});
							} else {
								await i.reply({
									content:
										'Something went wrong. Please try again later',
									ephemeral: true,
								});
							}
						}
					}
				});
			await phaseOne(interaction);
		} catch (e) {
			console.log(e);
		}
	},
};
