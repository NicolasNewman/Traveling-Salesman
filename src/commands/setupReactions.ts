import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message, MessageEmbed } from 'discord.js';
import { logError } from '../helper/string';

import Client from '../service/DBClient';
import ErrorCodes, { assertIsError } from '../types/error';
import Flag, { Flags } from '../types/flags';
import Items, { ItemKey } from '../types/item';

export default {
	data: new SlashCommandBuilder()
		.setName('reactions')
		.setDescription('Create the poll to subscribe to a role'),
	async execute(interaction: CommandInteraction) {},
};
