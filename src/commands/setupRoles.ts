import { SlashCommandBuilder } from '@discordjs/builders';
import {
	CommandInteraction,
	MessageActionRow,
	MessageButton,
	MessageComponentInteraction,
	MessageSelectMenu,
} from 'discord.js';

import Client from '../service/DBClient';
import Flag, { Flags } from '../types/flags';

export default {
	data: new SlashCommandBuilder()
		.setName('setup-roles')
		.setDescription('Configures the bot to function on your server'),
	async execute(interaction: CommandInteraction) {},
};
