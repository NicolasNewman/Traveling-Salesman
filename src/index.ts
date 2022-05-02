import 'dotenv/config';

import { Client, Intents, Collection } from 'discord.js';

import commands from './commands';
import events from './events';
import Logger from './service/Logger';
import DBClient from './service/DBClient';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
client.logger = new Logger();
client.db = new DBClient();

//==============================//
//    Command Initialization    //
//==============================//

client.commands = new Collection();
for (const command of commands) {
	client.commands.set(command.data.name, command);
}

//==============================//
//     Event Initialization     //
//==============================//

for (const event of events) {
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.DISCORD_TOKEN);
