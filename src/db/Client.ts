import { PrismaClient, Guild } from '@prisma/client';

class DBClient {
	public prisma: PrismaClient;
	private static instance: DBClient;
	private constructor() {
		this.prisma = new PrismaClient();
	}

	public static getInstance = () => {
		if (!DBClient.instance) {
			DBClient.instance = new DBClient();
		}
		return DBClient.instance;
	};

	public update = async (
		gid: string,
		data: Omit<Partial<Guild>, 'guildId' | 'id'>,
	) => {
		return await this.prisma.guild.upsert({
			where: { guildId: gid },
			create: { ...data, guildId: gid, prefix: '/' },
			update: { ...data },
		});
	};
}

export default DBClient;
