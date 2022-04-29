import { IEvent, TextChannel } from 'discord.js';
import Client from '../service/Client';

export default {
	name: 'guildCreate',
	async execute(m) {
		Client.getInstance().update(m.id, {name: m.name});
		console.log(`[guildCreate] ${m.name}`)
	},
} as IEvent<'guildCreate'>;
