import { handlePrismaError } from '../helper';
import { IEvent } from '../types';

export default {
	name: 'guildCreate',
	async execute(guild) {
		const { logger, db } = guild.client;
		try {
			await db.prisma.guild.create({
				data: { guildId: guild.id, name: guild.name },
			});
			logger.log('INFO', 'The bot was added to a guild', { guildName: guild.name, loc: this.name });
		} catch (err) {
			handlePrismaError({
				replyType: 'NONE',
				logger,
				err,
			});
		}
	},
} as IEvent<'guildCreate'>;
