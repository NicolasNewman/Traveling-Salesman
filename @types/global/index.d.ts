export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			CLIENT_ID: string;
			GUILD_ID: string;
			TWILIO_TOKEN: string;
			TWILIO_SID: string;
			TWILIO_FROM: string;
		}
	}
}
