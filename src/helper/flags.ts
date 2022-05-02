import { FlagManager, Flags } from '../types';

const FlagManager = {
	create: (...args) => args.reduce((prev, curr) => (prev |= curr)),
	remove: (flag, ...args) =>
		(flag &= ~args.reduce((prev, curr) => (prev |= curr))),
	check: (flag, ...args) => {
		const combinedFlag = args.reduce((prev, curr) => (prev |= curr));
		return (flag & combinedFlag) === combinedFlag;
	},
} as FlagManager<Flags>;

export { FlagManager };
