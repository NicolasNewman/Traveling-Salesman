/*
  Warnings:

  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `setupAssignment` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `setupChannel` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `setupRoles` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `setupFlags` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_pkey",
DROP COLUMN "id",
DROP COLUMN "setupAssignment",
DROP COLUMN "setupChannel",
DROP COLUMN "setupRoles",
ADD COLUMN     "setupFlags" SMALLINT NOT NULL;
