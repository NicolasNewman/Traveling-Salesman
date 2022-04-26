import { IEvent } from "discord.js";

import messageCreate from './events/messageCreate';
import interactionCreate from './events/interactionCreate';
import ready from './events/ready';

export default [messageCreate, interactionCreate, ready] as IEvent<any>[]
