import { IEvent, TextChannel } from 'discord.js';
import Client from '../service/Client';
import Flag, { Flags } from '../types/flags';
import Item from '../types/item';

export default {
	name: 'messageCreate',
	async execute(m) {
		if (m.author.bot && m.author.id === '967268036098797608') {
			const gid = m.guildId;
			if (gid) {
				let body = m.embeds[0].description;
				const data = await Client.getInstance().get(gid);
				console.log(`[messageCreate]: ${data?.name} with flags ${data?.setupFlags}`);
				if (
					data &&
					body &&
					Flag.check(
						data.setupFlags ?? 0,
						Flags.SETUP_CHANNEL,
						Flags.SETUP_ROLE,
					)
				) {
					body = body.replace(/\n/g, '');
					console.log(body);
					const itemInfo = body.match(/```[a-z]*\[(.*)\]```/);
					const zoneInfo = body.match(/\*\*Location\*\*: (\[[^\)]*\))/);
					console.log(`[messageCreate]: Item [${itemInfo?.[1]}] Zone ${zoneInfo?.[1]}`)
					if (itemInfo && zoneInfo && itemInfo.length >= 2 && zoneInfo.length >= 2) {
						const item = itemInfo[1];
						const zone = zoneInfo[1];
						let message = '';
						if (item.includes(Item.MOKAMOKA)) {
							message += `<@&${data.mokamokaId}> `;
						}
						if (item.includes(Item.RAPPORT)) {
							message += `<@&${data.rapportId}> `;
						}
						if (item.includes(Item.SIERA)) {
							message += `<@&${data.sieraId}> `;
						}
						if (item.includes(Item.WEI)) {
							message += `<@&${data.weiId}> `;
						}
						message += zone;

						const channel = await m.client.channels.cache.get(
							data.writeChannelId ?? '',
						);
						(channel as TextChannel).send(message);
					}
				}
			}
		}
	},
} as IEvent<'messageCreate'>;
