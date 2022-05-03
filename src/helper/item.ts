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
	Rapport: {
		idFieldName: Prisma.GuildScalarFieldEnum.rapportId,
		reaction: '3⃣',
	},
};

export { Items };
