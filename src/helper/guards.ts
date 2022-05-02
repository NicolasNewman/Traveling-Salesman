import { Guild } from '@prisma/client';

const isGuild = (object: Guild | any): object is Guild => {
	return object != null && 'guildId' in (object as Guild);
};

const assertIsError = (error: unknown): asserts error is Error => {
	if (!(error instanceof Error)) {
		throw error;
	}
};

export { isGuild, assertIsError };
