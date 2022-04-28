-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "weiId" TEXT,
    "sierraId" TEXT,
    "mokamokaId" TEXT,
    "rapportId" TEXT,
    "readChannelId" TEXT,
    "writeChannelId" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guildId_key" ON "Guild"("guildId");
