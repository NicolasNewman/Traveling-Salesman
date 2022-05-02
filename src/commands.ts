// import setup from './commands/setup';
// import reactions from './commands/setupReactions';
import { ICommand } from './types';
import setupChannels from './commands/setupChannels';
import status from './commands/status';

export default [setupChannels, status] as ICommand[];
