/*
  Warnings:

  - You are about to drop the column `sianId` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "sianId",
ADD COLUMN     "seriaId" TEXT;
