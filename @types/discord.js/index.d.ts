import { Collection } from 'discord.js'

declare module "discord.js" {
    interface Client {
        commands: Collection<any, any>
    }

    export interface IEvent<K extends keyof ClientEvents> {
        name: K
        once?: boolean;
        execute: (...args: ClientEvents[K]) => void;
    }
    export interface ICommand {
        data: SlashCommandBuilder
        execute: (interaction: CommandInteraction) => void
    }
}
