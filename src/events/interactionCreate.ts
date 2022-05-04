import { ErrorCodes, IEvent } from '../types';

export default {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const { logger, commands } = interaction.client;

		const command = commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			const errorMsg = logger.error(
				ErrorCodes.COMMAND_EXECUTION_ERROR,
				'There was an issue executing the command',
				error as Error,
			);
			if (interaction.replied) {
				await interaction.editReply({
					content: errorMsg,
					components: [],
				});
			} else {
				await interaction.reply({
					content: errorMsg,
					ephemeral: true,
				});
			}
		}
	},
} as IEvent<'interactionCreate'>;
