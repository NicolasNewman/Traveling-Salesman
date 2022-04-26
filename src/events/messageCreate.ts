import { IEvent } from 'discord.js'

export default {
    name: 'messageCreate',
    execute(m) {
        if (m.author.bot && m.author.id === '967268036098797608') {
            const gid = m.guildId;
            const body = m.embeds[0].description;
        }
        console.log(m);
    }
} as IEvent<'messageCreate'>