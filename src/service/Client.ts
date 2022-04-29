import { PrismaClient, Guild, Prisma } from '@prisma/client';

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
		data:
			| Omit<
					Prisma.Without<
						Prisma.GuildCreateInput,
						Prisma.GuildUncheckedCreateInput
					> &
						Prisma.GuildUncheckedCreateInput,
					'guildId'
			  >
			| Omit<
					Prisma.Without<
						Prisma.GuildUncheckedCreateInput,
						Prisma.GuildCreateInput
					> &
						Prisma.GuildCreateInput,
					'guildId'
			  >,
	) => {
		return await this.prisma.guild.upsert({
			where: { guildId: gid },
			create: { ...data, guildId: gid },
			update: { ...data },
		});
	};

	public get = async (gid: string) => {
		return await this.prisma.guild.findUnique({
			where: { guildId: gid },
		});
	};
}

export default DBClient;
