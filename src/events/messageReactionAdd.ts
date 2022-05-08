/* eslint-disable max-len */
import { FlagManager, getGuildMemberOrFetch, Items, ReactionToItem } from '../helper';
import { ErrorCodes, Flags, IEvent } from '../types';

export default {
	name: 'messageReactionAdd',
	async execute(reaction, user) {
		// Ignore reactions added by bots
		if (user.bot) return;
		const { logger, db } = reaction.client;
		if (reaction.emoji.id && reaction.message.guildId && reaction.message.guild) {
			const guildData = await db.get(reaction.message.guildId, { replyType: 'NONE', logger });
			if (!guildData) {
				return;
			}
			if (guildData.reactionMessageId === reaction.message.id) {
				if (!FlagManager.check(guildData.flags, Flags.SETUP_ROLE, Flags.SETUP_ASSIGNMENT)) {
					logger.error(
						ErrorCodes.CONFIG_NOT_SET,
						'The flags for either SETUP_ROLE or SETUP_ASSIGNMENT are not set. Cannot update roles from this reaction',
						{ guildName: reaction.message.guild.name, loc: this.name },
					);
					return;
				}
				// Get the guild member from the reaction's user info
				const guildMember = await getGuildMemberOrFetch(reaction.message.guild.members, user.id);
				// const guildMember = reaction.message.guild.members.cache.get(user.id);
				if (guildMember) {
					// Get the name of the item that the reacted emoji corresponds too
					const itemName = ReactionToItem(reaction.emoji.id);
					if (itemName) {
						// Get the id of the pingable role from the database
						const roleId = guildData[Items[itemName].idFieldName];
						if (roleId) {
							// Assign the role
							guildMember.roles.add(roleId);
						} else {
							logger.error(ErrorCodes.ROLE_NOT_FOUND, `No role for (${itemName}) was found`, {
								guildName: reaction.message.guild.name,
								loc: this.name,
							});
							user.send(
								`I'm sorry, there was an issue assigning the ${itemName} role to you in ${reaction.message.guild.name}. Please try again later or ask an admin to add it manually.`,
							);
						}
					} else {
						logger.error(
							ErrorCodes.EMOJI_NOT_FOUND,
							`Couldn't find the corresponding item for emoji id (${reaction.emoji.id})`,
							{
								guildName: reaction.message.guild.name,
								loc: this.name,
							},
						);
						user.send(
							`I'm sorry, there was an issue assigning a role to you in ${reaction.message.guild.name}. Please try again later or ask an admin to add it manually.`,
						);
					}
				} else {
					logger.error(
						ErrorCodes.GUILD_MEMBER_NOT_FOUND,
						`Guild member (${user.tag}) not found on guild (${reaction.message.guild.name})`,
						{
							guildName: reaction.message.guild.name,
							loc: this.name,
						},
					);
					user.send(
						`I'm sorry, there was an issue assigning a role to you in ${reaction.message.guild.name}. Please try again later or ask an admin to add it manually.`,
					);
				}
			}
		}
	},
} as IEvent<'messageReactionAdd'>;
