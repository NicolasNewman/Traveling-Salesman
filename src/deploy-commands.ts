import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import commands from './commands';

const commandList = commands.map((command) => command.data.toJSON());
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID,
			),
			{ body: commandList },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
