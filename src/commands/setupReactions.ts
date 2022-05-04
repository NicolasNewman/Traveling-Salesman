import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';
import { FlagManager, handleInteractionError, Items } from '../helper';
import { ErrorCodes, Flags, InteractionErrorCodes } from '../types';

export default {
	data: new SlashCommandBuilder().setName('setup-reactions').setDescription('Create the poll to subscribe to a role'),
	async execute(interaction: CommandInteraction) {
		const { logger, db } = interaction.client;
		if (
			!handleInteractionError({ replyType: 'REPLY', interaction, logger, ephemeral: true }, [
				InteractionErrorCodes.INTERACTION_NO_GUILDID,
				InteractionErrorCodes.INTERACTION_NO_GUILD,
			]) ||
			!interaction.guildId ||
			!interaction.guild
		) {
			return;
		}
		const guildData = await db.get(interaction.guildId, {
			replyType: 'REPLY',
			interaction,
			logger,
			ephemeral: true,
		});
		if (!guildData) {
			return;
		}
		if (!FlagManager.check(guildData.flags, Flags.SETUP_ROLE)) {
			await interaction.reply({
				content: logger.error(
					ErrorCodes.CONFIG_NOT_SET,
					'The roles have not been properly setup. Try running /setup-roles',
				),
				ephemeral: true,
			});
			return;
		}
		let response = 'React to the following to receive pings for when a merchant has a card in stock.\n\n';
		const reactions = [];
		for (const [key, value] of Object.entries(Items)) {
			response += `\t${value.reaction}: ${key}\n`;
			reactions.push(value.reaction);
		}
		response += '\n';
		const msg = (await interaction.reply({
			content: response,
			fetchReply: true,
		})) as Message;
		for (const reaction of reactions) {
			await msg.react(reaction);
		}
		await db.update(
			interaction.guildId,
			{
				reactionMessageId: msg.id,
				reactionChannelId: msg.channelId,
				flags: FlagManager.create(guildData.flags, Flags.SETUP_ASSIGNMENT),
			},
			{ replyType: 'EDIT_REPLY', interaction, logger },
		);
	},
};
