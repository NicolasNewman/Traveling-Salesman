/*
  Warnings:

  - You are about to drop the column `setupFlags` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "setupFlags",
ADD COLUMN     "flags" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "reactionMessageId" TEXT NOT NULL DEFAULT E'';
