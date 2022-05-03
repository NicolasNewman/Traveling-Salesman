import { Prisma } from '@prisma/client';

export type GuildUpdate =
	| Omit<
			Prisma.Without<Prisma.GuildCreateInput, Prisma.GuildUncheckedCreateInput> &
				Prisma.GuildUncheckedCreateInput,
			'guildId'
	  >
	| Omit<
			Prisma.Without<Prisma.GuildUncheckedCreateInput, Prisma.GuildCreateInput> & Prisma.GuildCreateInput,
			'guildId'
	  >;
