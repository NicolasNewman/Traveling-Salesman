import { IEvent } from '../types';

export default {
	name: 'ready',
	execute(c) {
		console.log(`The bot is ready! ${c.user.tag}`);
	},
} as IEvent<'ready'>;
