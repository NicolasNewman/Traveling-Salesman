import { Prisma } from '@prisma/client';
import { ItemKey, ItemObj } from '../types';

const Items: { [key in ItemKey]: ItemObj } = {
	Siera: {
		idFieldName: Prisma.GuildScalarFieldEnum.sieraId,
		reaction: '1️⃣',
	},
	Mokamoka: {
		idFieldName: Prisma.GuildScalarFieldEnum.mokamokaId,
		reaction: '2️⃣',
	},
	Wei: {
		idFieldName: Prisma.GuildScalarFieldEnum.weiId,
		reaction: '3️⃣',
	},
	Rapport: {
		idFieldName: Prisma.GuildScalarFieldEnum.rapportId,
		reaction: '4️⃣',
	},
};

export { Items };
