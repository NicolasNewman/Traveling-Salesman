import { Prisma } from '@prisma/client';
import { ErrorCodes, ErrorHandlerOptions, InteractableErrorHandlerOptions, InteractionErrorCodes } from '../types';
import { replyFactory } from './helper';

const handlePrismaError = async (options: ErrorHandlerOptions) => {
	const { logger, err: error } = options;
	const replyHandler = replyFactory(options);
	if (error instanceof Prisma.PrismaClientInitializationError) {
		await replyHandler(logger.error(ErrorCodes.PRISMA_INIT_ERROR, 'Could not connect to the database.', { error }));
	} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
		await replyHandler(
			logger.error(ErrorCodes.PRISMA_REQUEST_ERROR, 'Could not successfully fetch data from the database.', {
				error,
			}),
		);
	} else if (error instanceof Error) {
		await replyHandler(logger.error(ErrorCodes.UNKNOWN, 'Something went wrong.', { error }));
	}
};

const handleInteractionError = async (
	options: InteractableErrorHandlerOptions,
	codes: typeof InteractionErrorCodes[keyof typeof InteractionErrorCodes][],
	messages?: {
		[key in typeof InteractionErrorCodes[keyof typeof InteractionErrorCodes]]: string;
	},
) => {
	const { interaction, logger } = options;
	const replyEvent = replyFactory(options);

	for (const code of codes) {
		const msg = messages?.[code] ?? `[Error ${code}] The interaction is misformatted`;
		switch (code) {
			case InteractionErrorCodes.INTERACTION_NO_GUILD: {
				if (!options.interaction.guild) {
					await replyEvent(msg);
					options.logger.error(
						InteractionErrorCodes.INTERACTION_NO_GUILD,
						'Guild not attached to interaction',
					);
					return false;
				}
				break;
			}
			case InteractionErrorCodes.INTERACTION_NO_GUILDID:
				if (!interaction.guildId) {
					await replyEvent(msg);
					logger.error(InteractionErrorCodes.INTERACTION_NO_GUILDID, 'GuildId not attached to interaction');
					return false;
				}
				break;
			case InteractionErrorCodes.INTERACTION_NO_CHANNEL:
				if (!interaction.channel) {
					await replyEvent(msg);
					logger.error(
						InteractionErrorCodes.INTERACTION_NO_CHANNEL,
						`Channel not attached to interaction for guild [${interaction.guild?.name}]`,
					);
					return false;
				}
				break;
		}
	}
	return true;
};

export { handlePrismaError, handleInteractionError };
