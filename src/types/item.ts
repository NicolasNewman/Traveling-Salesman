import { Prisma } from '@prisma/client';

const Item = {
	SIERA: 'Siera',
	MOKAMOKA: 'Mokamoka',
	WEI: 'Wei',
	RAPPORT: 'Rapport',
} as const;

type ItemKey = typeof Item[keyof typeof Item];

type ItemObj = {
	idFieldName: Extract<Prisma.GuildScalarFieldEnum, 'weiId' | 'mokamokaId' | 'sieraId' | 'rapportId'>;
	reaction: string;
};

export { Item, ItemObj, ItemKey };
