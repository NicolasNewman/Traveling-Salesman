import { ICommand } from 'discord.js';

import ping from './commands/ping';
import server from './commands/server';
import user from './commands/user';


export default [ping, server, user] as ICommand[];