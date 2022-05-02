import { handlePrismaError } from '../helper';
import { IEvent } from '../types';

export default {
	name: 'guildDelete',
	async execute(guild) {
		const { logger, db } = guild.client;
		try {
			await db.prisma.guild.delete({
				where: { guildId: guild.id },
			});
			logger.log(
				'INFO',
				`The bot was removed from guild [${guild.name}] with id [${guild.id}]`,
			);
		} catch (err) {
			handlePrismaError({
				replyType: 'NONE',
				logger,
				err,
			});
		}
	},
} as IEvent<'guildDelete'>;
