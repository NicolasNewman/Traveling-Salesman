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
	format.printf(({ level, message, timestamp }) => `[${timestamp}/${level}]: ${message}`),
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

	log = (level: keyof typeof LogLevel, message: string) => {
		switch (level) {
			case 'INFO':
				this.logger.info(message);
				break;
			case 'WARN':
				this.logger.warn(message);
				break;
			case 'ERROR':
				this.logger.error(message);
				break;
		}
	};

	error = (errorCode: typeof ErrorCodes[keyof typeof ErrorCodes] | string, message: string, error?: Error) => {
		this.logger.error(message);
		if (error) {
			this.logger.error(error.stack);
		}
		return `[Error ${errorCode}] ${message}`;
	};
}
