import { GuildMemberManager } from 'discord.js';

const getGuildMemberOrFetch = async (obj: GuildMemberManager, id: string) => {
	if (obj instanceof GuildMemberManager) {
		const get = obj.cache.get(id);
		if (!get) {
			return await obj.fetch(id);
		}
		return get;
	}
};

export { getGuildMemberOrFetch };
