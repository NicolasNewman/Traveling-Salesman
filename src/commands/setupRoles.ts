import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('setup-roles')
		.setDescription('Configures the bot to function on your server'),
	async execute(interaction: CommandInteraction) {},
};
