import { ICommand } from 'discord.js';

import setup from './commands/setup';
import status from './commands/status';

export default [setup, status] as ICommand[];
