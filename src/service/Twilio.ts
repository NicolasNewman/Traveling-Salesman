import 'dotenv/config';

import { Twilio } from 'twilio';

class TwilioManager {
	public twilio: Twilio;
	private static instance: TwilioManager;
	private constructor() {
		this.twilio = new Twilio(
			process.env.TWILIO_SID,
			process.env.TWILIO_TOKEN,
		);
	}

	public static getInstance = () => {
		if (!TwilioManager.instance) {
			TwilioManager.instance = new TwilioManager();
		}
		return TwilioManager.instance;
	};

	public send = async (body: string, to: string) => {
		await this.twilio.messages.create({
			body,
			to,
			from: process.env.TWILIO_FROM,
		});
	};
}

export default TwilioManager;
