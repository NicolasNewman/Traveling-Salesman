import { handlePrismaError } from '../helper';
import { IEvent } from '../types';

export default {
	name: 'guildCreate',
	async execute(guild) {
		try {
			await guild.client.db.prisma.guild.create({
				data: { guildId: guild.id, name: guild.name },
			});
			guild.client.logger.log(
				'INFO',
				`The bot was added to guild [${guild.name}] with id [${guild.id}]`,
			);
		} catch (err) {
			handlePrismaError({
				replyType: 'NONE',
				logger: guild.client.logger,
				err,
			});
		}
	},
} as IEvent<'guildCreate'>;
