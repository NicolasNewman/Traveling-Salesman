import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, RoleManager } from 'discord.js';
import { FlagManager, handleInteractionError, Items } from '../helper';
import { InteractionErrorCodes, GuildUpdate, Flags } from '../types';

type RoleCreationResult = 'CREATED' | 'FAILED' | 'OK';
const checkAndCreateRole = async (
	roles: RoleManager,
	name: string,
	id: string | null,
): Promise<{ status: RoleCreationResult; id: string | null }> => {
	if (id === null || id === '' || roles.cache.get(id) === undefined) {
		const role = await roles.create({ mentionable: true, name: `${name} (ping)` });
		return role ? { status: 'CREATED', id: role.id } : { status: 'FAILED', id: null };
	}
	return { status: 'OK', id };
};

export default {
	data: new SlashCommandBuilder()
		.setName('setup-roles')
		.setDescription('Configures the bot to function on your server'),
	async execute(interaction: CommandInteraction) {
		await interaction.deferReply();
		const { db, logger } = interaction.client;
		// Interaction error handling
		if (
			!(await handleInteractionError({ replyType: 'EDIT_REPLY', interaction, logger }, [
				InteractionErrorCodes.INTERACTION_NO_GUILD,
				InteractionErrorCodes.INTERACTION_NO_GUILDID,
			])) ||
			!interaction.guild ||
			!interaction.guildId
		) {
			return;
		}
		// Verify record for guild exists in DB
		const guildData = await db.get(interaction.guildId, { replyType: 'EDIT_REPLY', interaction, logger });
		if (!guildData) {
			return;
		}

		const roleManager = interaction.guild.roles;
		// Contains the item names and their status to build the embeded reply
		const results: { name: string; value: RoleCreationResult }[] = [];
		let failed = false;
		// Contains the fields to send to the DB in the update query
		const updateObj: GuildUpdate = {};
		// Loop through each registered item and set up the needed DS
		for (const [key, value] of Object.entries(Items)) {
			const result = await checkAndCreateRole(roleManager, `${key} (ping)`, guildData[value.idFieldName]);
			// If the role was created, add the role's ID to the update object
			if (result.status === 'CREATED') {
				updateObj[value.idFieldName] = result.id;
			}
			// Add the status of the creation attempt to the results array
			results.push({
				name: key,
				value: result.status,
			});
			if (result.status === 'FAILED') {
				failed = true;
			}
		}
		// If one of the roles failed to be created, make sure the flags are updated to indicate that
		const flag = failed
			? FlagManager.remove(guildData.flags, Flags.SETUP_ROLE)
			: FlagManager.create(guildData.flags, Flags.SETUP_ROLE);
		updateObj.flags = flag;

		await db.update(interaction.guildId, updateObj, { replyType: 'EDIT_REPLY', interaction, logger });

		const embed = new MessageEmbed().setColor('AQUA').setTitle('Role Creation Status');
		results.forEach((result) => embed.addField(result.name, result.value));
		await interaction.editReply({ embeds: [embed] });
	},
};
