import { TextChannel } from 'discord.js';
import { FlagManager } from '../helper';
import { ErrorCodes, Flags, IEvent } from '../types';

export default {
	name: 'ready',
	async execute(client) {
		const { logger, db } = client;
		client.logger.log('INFO', `${client.user.tag} is ready!`);

		// If guilds had existing reaction messages, they are no longer in the cache after the bot restarts
		// We need to load them back in using the stored info in the DB
		const guilds = await db.prisma.guild.findMany({
			select: { guildId: true, name: true, reactionChannelId: true, reactionMessageId: true, flags: true },
		});
		guilds.forEach(async (guild) => {
			if (FlagManager.check(guild.flags, Flags.SETUP_ASSIGNMENT)) {
				client.guilds
					.fetch(guild.guildId)
					.then((fetchedGuild) => {
						const fetchedChannel = fetchedGuild.channels.cache.get(guild.reactionChannelId) as TextChannel;
						if (fetchedChannel) {
							fetchedChannel.messages
								.fetch(guild.reactionMessageId)
								.then((_fetchedMessage) => {
									logger.log(
										'INFO',
										`Successfully fetched reaction message for guild (${guild.name})`,
									);
								})
								.catch((err) =>
									logger.error(
										ErrorCodes.UNKNOWN,
										`An error occurd while fetching the reaction message for guild (${guild.name})`,
										err,
									),
								);
						} else {
							logger.error(
								ErrorCodes.CHANNEL_NOT_FOUND,
								`Could not find the reaction channel for guild (${guild.name})`,
							);
						}
					})
					.catch((err) =>
						logger.error(
							ErrorCodes.UNKNOWN,
							`An error occurd while fetching the guild (${guild.name})`,
							err,
						),
					);
			}
		});
	},
} as IEvent<'ready'>;
