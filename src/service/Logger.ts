import { createLogger, format, transports, LeveledLogMethod } from 'winston';
import { Format } from 'logform';
import { Logger as WinLogger } from 'winston';
import { ErrorCodes } from '../types/error';

const LogLevels = {
	levels: {
		info: 2,
		warn: 1,
		error: 0,
	},
	colors: {
		info: 'white',
		warn: 'yellow',
		error: 'red',
	},
};

enum LogLevel {
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
}

type Log = WinLogger & Record<keyof typeof LogLevels['levels'], LeveledLogMethod>;

const formatter: Format = format.combine(
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
	format.printf(({ level, message, timestamp, metadata }) => {
		const guildName = metadata?.metadata?.guildName;
		const loc = metadata?.metadata?.loc;
		const meta = `${loc ? `/${loc}` : ''}${guildName ? `/${guildName}` : ''}`;
		return `[${timestamp}/${level}${meta}]: ${message}`;
	}),
);

const colorizedFormatter: Format = format.combine(format.colorize({ all: true }), formatter);

const commonFileOptions: transports.FileTransportOptions = {
	maxsize: 10000000,
	// zippedArchive: true,
};

export default class Logger {
	private logger: Log;

	constructor() {
		this.logger = createLogger({
			levels: LogLevels.levels,
			transports: [
				new transports.Console({ format: colorizedFormatter }),
				new transports.File({
					filename: './logs/log.log',
					...commonFileOptions,
				}),
			],
			format: formatter,
		});
	}

	log = (level: keyof typeof LogLevel, message: string, opts?: { guildName?: string; loc?: string }) => {
		switch (level) {
			case 'INFO':
				this.logger.info(message, { guildName: opts?.guildName, loc: opts?.loc });
				break;
			case 'WARN':
				this.logger.warn(message, { guildName: opts?.guildName, loc: opts?.loc });
				break;
			case 'ERROR':
				this.logger.error(message, { guildName: opts?.guildName, loc: opts?.loc });
				break;
		}
	};

	error = (
		errorCode: typeof ErrorCodes[keyof typeof ErrorCodes] | string,
		message: string,
		opts?: { error?: Error; guildName?: string; loc?: string },
	) => {
		this.logger.error(message, { guildName: opts?.guildName, loc: opts?.loc });
		if (opts?.error) {
			this.logger.error(opts.error.stack ?? '', { guildName: opts?.guildName, loc: opts?.loc });
		}
		return `[Error ${errorCode}] ${message}`;
	};
}
