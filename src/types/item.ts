import { Prisma } from '@prisma/client';

const Item = {
	SIERA: 'Siera',
	MOKAMOKA: 'Mokamoka',
	WEI: 'Wei',
	SIAN: 'Sian',
	MADNICK: 'Madnick',
	KAYSARR: 'Kaysarr',
	RAPPORT: 'Legendary Rapport',
} as const;

type ItemKey = typeof Item[keyof typeof Item];

type ItemObj = {
	idFieldName: Extract<
		Prisma.GuildScalarFieldEnum,
		'weiId' | 'mokamokaId' | 'sieraId' | 'rapportId' | 'sianId' | 'madnickId' | 'kaysarrId'
	>;
	reaction: string;
};

export { Item, ItemObj, ItemKey };
