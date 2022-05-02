export type FlagManager<T> = {
	create: (...args: T[]) => number;
	remove: (flag: number, ...args: T[]) => number;
	check: (flag: number, ...args: T[]) => boolean;
};

export enum Flags {
	NONE,
	SETUP_ROLE = 1 << 0,
	SETUP_CHANNEL = 1 << 1,
	SETUP_ASSIGNMENT = 1 << 2,
	// << 15 - STOP
}
