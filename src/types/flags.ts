type FlagHelper<T> = {
	create: (...args: T[]) => number;
	remove: (flag: number, ...args: T[]) => number;
	check: (flag: number, ...args: T[]) => boolean;
};

enum Flags {
	NONE,
	SETUP_ROLE = 1 << 0,
	SETUP_CHANNEL = 1 << 1,
	SETUP_ASSIGNMENT = 1 << 2,
	// << 15 - STOP
}

export default {
	create: (...args) => args.reduce((prev, curr) => (prev |= curr)),
	remove: (flag, ...args) =>
		(flag &= ~args.reduce((prev, curr) => (prev |= curr))),
	check: (flag, ...args) =>
		flag === args.reduce((prev, curr) => (prev |= curr)),
} as FlagHelper<Flags>;

export { Flags };
