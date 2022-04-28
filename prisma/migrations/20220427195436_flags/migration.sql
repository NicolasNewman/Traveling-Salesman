-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "setupAssignment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "setupChannel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "setupRoles" BOOLEAN NOT NULL DEFAULT false;
