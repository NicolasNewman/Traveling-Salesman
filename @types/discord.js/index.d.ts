import { Collection } from 'discord.js';
import Logger from '../../src/service/Logger';
import DBClient from '../../src/service/DBClient';

declare module 'discord.js' {
	interface Client {
		commands: Collection<any, any>;
		logger: Logger;
		db: DBClient;
	}
}
