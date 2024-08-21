/*
  Warnings:

  - You are about to drop the column `verificationToke` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationTokeExpiresAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_verificationToke_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationToke",
DROP COLUMN "verificationTokeExpiresAt",
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");
