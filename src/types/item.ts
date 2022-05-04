import { Prisma } from '@prisma/client';

const Item = {
	SERIA: 'Seria',
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
		'weiId' | 'mokamokaId' | 'seriaId' | 'rapportId' | 'sianId' | 'madnickId' | 'kaysarrId'
	>;
	reaction: string;
};

export { Item, ItemObj, ItemKey };
