import { IEvent } from '../types';

export default {
	name: 'ready',
	execute(client) {
		client.logger.log('INFO', `${client.user.tag} is ready!`);
	},
} as IEvent<'ready'>;
