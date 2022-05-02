import { handlePrismaError } from '../helper';
import { IEvent } from '../types';

export default {
	name: 'guildDelete',
	async execute(guild) {
		try {
			await guild.client.db.prisma.guild.delete({
				where: { guildId: guild.id },
			});
			guild.client.logger.log(
				'INFO',
				`The bot was removed from guild [${guild.name}] with id [${guild.id}]`,
			);
		} catch (err) {
			handlePrismaError({
				replyType: 'NONE',
				logger: guild.client.logger,
				err,
			});
		}
	},
} as IEvent<'guildDelete'>;
