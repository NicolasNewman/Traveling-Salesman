import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { handleInteractionError } from '../helper';
import { InteractionErrorCodes } from '../types';

export default {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Get the current config status of the bot'),
	async execute(interaction: CommandInteraction) {
		const { logger, db } = interaction.client;
		await interaction.deferReply({ ephemeral: true });

		if (
			(await !handleInteractionError(
				{ replyType: 'EDIT_REPLY', interaction, logger },
				[InteractionErrorCodes.INTERACTION_NO_GUILDID],
			)) ||
			!interaction.guildId
		) {
			return;
		}

		const guildData = await db.get(interaction.guildId, {
			interaction,
			logger,
			replyType: 'EDIT_REPLY',
		});
		if (!guildData) {
			return;
		}

		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setTitle('Configuration Settings')
			.addFields(
				{
					name: 'Guild Name',
					value: `${guildData.name ?? '❌'}`,
				},
				{
					name: 'Read Channel',
					value: `${
						guildData.readChannelId === ''
							? '❌'
							: guildData.readChannelId
					}`,
					inline: true,
				},
				{
					name: 'Write Channel',
					value: `${
						guildData.writeChannelId === ''
							? '❌'
							: guildData.writeChannelId
					}`,
					inline: true,
				},
				{ name: '\u200B', value: '\u200B' },
				{
					name: 'Wei Role',
					value: `${guildData.weiId ?? '❌'}`,
					inline: true,
				},
				{
					name: 'Mokamoka Role',
					value: `${guildData.mokamokaId ?? '❌'}`,
					inline: true,
				},
				{
					name: 'Sierra Role',
					value: `${guildData.sieraId ?? '❌'}`,
					inline: true,
				},
				{
					name: 'Rapport Role',
					value: `${guildData.sieraId ?? '❌'}`,
					inline: true,
				},
			);

		await interaction.editReply({ embeds: [embed] });
	},
};
