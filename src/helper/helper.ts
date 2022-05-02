import { ErrorHandlerOptions } from '../types';

const replyFactory = (
	options: ErrorHandlerOptions,
): ((content: string) => Promise<any>) => {
	const { replyType } = options;
	if (replyType === 'EDIT_REPLY') {
		return (content: string) =>
			options.interaction.editReply({
				content,
				components: options.rows,
			});
	} else if (options.replyType === 'UPDATE') {
		return (content: string) =>
			options.interaction.update({
				content,
				components: options.rows,
			});
	} else if (options.replyType === 'REPLY') {
		return (content: string) =>
			options.interaction.reply({
				content,
				ephemeral: options.ephemeral,
			});
	} else {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return (content: string) => new Promise((res, rej) => {});
	}
};

export { replyFactory };
