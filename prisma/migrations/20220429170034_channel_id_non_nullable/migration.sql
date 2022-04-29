/*
  Warnings:

  - Made the column `readChannelId` on table `Guild` required. This step will fail if there are existing NULL values in that column.
  - Made the column `writeChannelId` on table `Guild` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guild" ALTER COLUMN "readChannelId" SET NOT NULL,
ALTER COLUMN "readChannelId" SET DEFAULT E'',
ALTER COLUMN "writeChannelId" SET NOT NULL,
ALTER COLUMN "writeChannelId" SET DEFAULT E'';
