import { Prisma } from '@prisma/client';
import { ItemKey, ItemObj } from '../types';

const Items: { [key in ItemKey]: ItemObj } = {
	Siera: {
		idFieldName: Prisma.GuildScalarFieldEnum.sieraId,
		reaction: '0⃣',
	},
	Mokamoka: {
		idFieldName: Prisma.GuildScalarFieldEnum.mokamokaId,
		reaction: '1⃣',
	},
	Wei: {
		idFieldName: Prisma.GuildScalarFieldEnum.weiId,
		reaction: '2⃣',
	},
	'Legendary Rapport': {
		idFieldName: Prisma.GuildScalarFieldEnum.rapportId,
		reaction: '3⃣',
	},
	Sian: {
		idFieldName: Prisma.GuildScalarFieldEnum.sianId,
		reaction: '4⃣',
	},
	Madnick: {
		idFieldName: Prisma.GuildScalarFieldEnum.madnickId,
		reaction: '5⃣',
	},
	Kaysarr: {
		idFieldName: Prisma.GuildScalarFieldEnum.kaysarrId,
		reaction: '6⃣',
	},
};

export { Items };
