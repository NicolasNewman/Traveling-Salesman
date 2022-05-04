/*
  Warnings:

  - You are about to drop the column `sieraId` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "sieraId",
ADD COLUMN     "sianId" TEXT;
