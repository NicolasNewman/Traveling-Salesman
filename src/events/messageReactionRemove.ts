/* eslint-disable max-len */
import { getGuildMemberOrFetch, Items, ReactionToItem } from '../helper';
import { ErrorCodes, IEvent } from '../types';

export default {
	name: 'messageReactionRemove',
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
				// Get the guild member from the reaction's user info
				const guildMember = await getGuildMemberOrFetch(reaction.message.guild.members, user.id);
				if (guildMember) {
					// Get the name of the item that the reacted emoji corresponds too
					const itemName = ReactionToItem(reaction.emoji.id);
					if (itemName) {
						// Get the id of the pingable role from the database
						const roleId = guildData[Items[itemName].idFieldName];
						if (roleId) {
							// Remove the role
							guildMember.roles.remove(roleId);
						} else {
							logger.error(ErrorCodes.ROLE_NOT_FOUND, `No role for (${itemName}) was found`);
							user.send(
								`I'm sorry, there was an issue removing the ${itemName} role to you in ${reaction.message.guild.name}. Please try again later or ask an admin to remove it manually.`,
							);
						}
					} else {
						logger.error(
							ErrorCodes.EMOJI_NOT_FOUND,
							`Couldn't find the corresponding item for emoji id (${reaction.emoji.id})`,
						);
						user.send(
							`I'm sorry, there was an issue removing a role to you in ${reaction.message.guild.name}. Please try again later or ask an admin to remove it manually.`,
						);
					}
				} else {
					logger.error(
						ErrorCodes.GUILD_MEMBER_NOT_FOUND,
						`Guild member (${user.tag}) not found on guild (${reaction.message.guild.name})`,
					);
					user.send(
						`I'm sorry, there was an issue removing a role to you in ${reaction.message.guild.name}. Please try again later or ask an admin to remove it manually.`,
					);
				}
			}
		}
	},
} as IEvent<'messageReactionRemove'>;
