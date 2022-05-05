import { Prisma } from '@prisma/client';
import { ItemKey, ItemObj } from '../types';

const Items: { [key in ItemKey]: ItemObj } = {
	Wei: {
		idFieldName: Prisma.GuildScalarFieldEnum.weiId,
		reaction: '<:wei:971169308422062081>',
	},
	Seria: {
		idFieldName: Prisma.GuildScalarFieldEnum.seriaId,
		reaction: '<:seria:971169359110213643>',
	},
	Mokamoka: {
		idFieldName: Prisma.GuildScalarFieldEnum.mokamokaId,
		reaction: '<:mokamoka:971169371911249940>',
	},
	Sian: {
		idFieldName: Prisma.GuildScalarFieldEnum.sianId,
		reaction: '<:sian:971169342731460619>',
	},
	Madnick: {
		idFieldName: Prisma.GuildScalarFieldEnum.madnickId,
		reaction: '<:madnick:971169385509171290>',
	},
	Kaysarr: {
		idFieldName: Prisma.GuildScalarFieldEnum.kaysarrId,
		reaction: '<:kaysarr:971169394648576101>',
	},
	'Legendary Rapport': {
		idFieldName: Prisma.GuildScalarFieldEnum.rapportId,
		reaction: '<:rapport:971169404698103818>',
	},
};

const ReactionToItem = (id: string | null) => {
	if (id === null) return null;

	for (const [key, value] of Object.entries(Items)) {
		if (value.reaction.includes(id)) {
			return key as ItemKey;
		}
	}

	return null;
};

export { Items, ReactionToItem };
