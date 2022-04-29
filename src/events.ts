import { IEvent } from "discord.js";

import messageCreate from './events/messageCreate';
import interactionCreate from './events/interactionCreate';
import guildCreate from './events/guildCreate';
import channelDelete from './events/channelDelete';
import ready from './events/ready';

export default [messageCreate, interactionCreate, guildCreate, channelDelete, ready] as IEvent<any>[]
