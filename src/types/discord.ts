import { SlashCommandBuilder } from '@discordjs/builders';
import {
	BaseMessageComponentOptions,
	ClientEvents,
	CommandInteraction,
	MessageActionRow,
	MessageActionRowOptions,
} from 'discord.js';

export type MessageRow = (MessageActionRow | (Required<BaseMessageComponentOptions> & MessageActionRowOptions))[];

export interface IEvent<K extends keyof ClientEvents> {
	name: K;
	once?: boolean;
	execute: (...args: ClientEvents[K]) => void;
}
export interface ICommand {
	data: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => void;
}
