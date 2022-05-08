-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "weiId" BOOLEAN NOT NULL DEFAULT false,
    "sianId" BOOLEAN NOT NULL DEFAULT false,
    "kaysarrId" BOOLEAN NOT NULL DEFAULT false,
    "madnickId" BOOLEAN NOT NULL DEFAULT false,
    "seriaId" BOOLEAN NOT NULL DEFAULT false,
    "mokamokaId" BOOLEAN NOT NULL DEFAULT false,
    "rapportId" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
