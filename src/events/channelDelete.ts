import { IEvent, TextChannel } from 'discord.js';
import Client from '../service/Client';
import Flag, { Flags } from '../types/flags';

export default {
	name: 'channelDelete',
	async execute(m) {
		if (m.type === "GUILD_TEXT") {
			const channel = m as TextChannel;
			const data = await Client.getInstance().get(m.guildId);
			if (data) {
				let wrDeleted = false;
				if (channel.id === data?.writeChannelId) {
					wrDeleted = true;
				}
				if (channel.id === data?.readChannelId) {
					wrDeleted = true;
				}
				if (wrDeleted) {
					await Client.getInstance().update(m.guildId, {
						readChannelId: '',
						writeChannelId: '',
						setupFlags: Flag.remove(data.setupFlags, Flags.SETUP_CHANNEL)
					})
				}
				console.log(`[channelDelete]: w/r deleted: ${wrDeleted}`);
			}
		}
	},
} as IEvent<'channelDelete'>;
