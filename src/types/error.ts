import { CommandInteraction, MessageComponentInteraction } from 'discord.js';
import Logger from '../service/Logger';
import { MessageRow } from '../types/discord';

const InteractionErrorCodes = {
	INTERACTION_NO_GUILD: 501,
	INTERACTION_NO_GUILDID: 502,
	INTERACTION_NO_CHANNEL: 503,
} as const;

const ErrorCodes = {
	// GENERAL
	UNKNOWN: 400,
	GUILD_NOT_FOUND: 401,
	CONFIG_NOT_SET: 402,
	REACTION_ERROR: 403,
	COMMAND_EXECUTION_ERROR: 404,
	// INTERACTION ERRORS
	...InteractionErrorCodes,
	// PRISMA ERRORS
	PRISMA_REQUEST_ERROR: 604,
	PRISMA_INIT_ERROR: 605,
	// NOT FOUND ERRORS
	GUILD_MEMBER_NOT_FOUND: 705,
	ROLE_NOT_FOUND: 706,
	CHANNEL_NOT_FOUND: 707,
	EMOJI_NOT_FOUND: 708,
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
