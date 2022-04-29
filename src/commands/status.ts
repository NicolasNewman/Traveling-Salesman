import { SlashCommandBuilder } from '@discordjs/builders';
import {
	CommandInteraction,
	MessageActionRow,
	MessageButton,
	MessageComponentInteraction,
	MessageEmbed,
	MessageSelectMenu,
} from 'discord.js';

import Client from '../service/Client';
import Flag, { Flags } from '../types/flags';


export default {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Get the current config status of the bot'),
	async execute(i: CommandInteraction) {
		await i.deferReply();
		const data = await Client.getInstance().get(i.guildId ?? '');
		console.log(data);
		if (data && i.guild) {
			const hasSetupChannel = Flag.check(data.setupFlags, Flags.SETUP_CHANNEL);
			const setupStatus: [{name: string, value: string, inline?: boolean}] = [{name: 'Channels Configured', value: `${hasSetupChannel}`}];
			if (hasSetupChannel) {
				const rName = i.guild.channels.cache.get(data.readChannelId)?.name ?? '';
				const wName = i.guild.channels.cache.get(data.writeChannelId)?.name ?? '';
				setupStatus.push({name: 'Read Channel', value: rName, inline: true}, {name: 'Write Channel', value: wName, inline: true})
			}
			setupStatus.push({name: 'Roles Configured', value: `${Flag.check(data.setupFlags, Flags.SETUP_ROLE)}`}, {name: 'Role assignment configured', value: `${Flag.check(data.setupFlags, Flags.SETUP_ASSIGNMENT)}`})
			await i.editReply({
				embeds: [
					new MessageEmbed()
					.setColor('BLUE')
					.setTitle('Status')
					.setDescription('Bot status')
					.addFields(
						...setupStatus
					)
					.setTimestamp()
				]
			})
		} else {
			i.reply('Error: Could not fetch the config status of the bot');
		}
	},
};
