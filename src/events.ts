import ready from './events/ready';
import interactionCreate from './events/interactionCreate';
import messageCreate from './events/messageCreate';
import messageReactionAdd from './events/messageReactionAdd';
import messageReactionRemove from './events/messageReactionRemove';
import guildCreate from './events/guildCreate';
import channelDelete from './events/channelDelete';
import { IEvent } from './types';

export default [
	messageCreate,
	interactionCreate,
	guildCreate,
	channelDelete,
	ready,
	messageReactionAdd,
	messageReactionRemove,
] as IEvent<any>[];
