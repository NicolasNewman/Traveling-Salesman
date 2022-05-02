import { CommandInteraction, MessageComponentInteraction } from 'discord.js';
import Logger from '../service/Logger';
import { MessageRow } from '../types/discord';

const InteractionErrorCodes = {
	INTERACTION_NO_GUILD: 501,
	INTERACTION_NO_GUILDID: 502,
	INTERACTION_NO_CHANNEL: 503,
} as const;

const ErrorCodes = {
	UNKNOWN: 400,
	GUILD_NOT_FOUND: 401,
	CONFIG_NOT_SET: 402,
	REACTION_ERROR: 403,
	PRISMA_REQUEST_ERROR: 404,
	PRISMA_INIT_ERROR: 405,
	...InteractionErrorCodes,
} as const;

export type ReplyType = 'REPLY' | 'EDIT_REPLY' | 'UPDATE' | 'NONE';

export interface IErrorHandlerOptions {
	replyType: ReplyType;
	logger: Logger;
	err?: unknown;
}

export interface ReplyErrorHandlerOptions extends IErrorHandlerOptions {
	replyType: 'REPLY';
	interaction: CommandInteraction | MessageComponentInteraction;
	ephemeral: boolean;
	rows?: MessageRow;
}

export interface EditErrorHandlerOptions extends IErrorHandlerOptions {
	replyType: 'EDIT_REPLY';
	interaction: CommandInteraction | MessageComponentInteraction;
	rows?: MessageRow;
}

export interface UpdateErrorHandlerOptions extends IErrorHandlerOptions {
	replyType: 'UPDATE';
	interaction: MessageComponentInteraction;
	rows?: MessageRow;
}

export interface LoggerErrorHandlerOptions extends IErrorHandlerOptions {
	replyType: 'NONE';
}

export type ErrorHandlerOptions =
	| ReplyErrorHandlerOptions
	| EditErrorHandlerOptions
	| UpdateErrorHandlerOptions
	| LoggerErrorHandlerOptions;

export type InteractableErrorHandlerOptions =
	| ReplyErrorHandlerOptions
	| EditErrorHandlerOptions
	| UpdateErrorHandlerOptions;

export { InteractionErrorCodes, ErrorCodes };
