/*
  Warnings:

  - You are about to drop the column `sierraId` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "sierraId",
ADD COLUMN     "sieraId" TEXT;
