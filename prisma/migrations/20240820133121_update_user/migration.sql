/*
  Warnings:

  - You are about to drop the column `resetPasswordToke` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordToke",
ADD COLUMN     "resetPasswordToken" TEXT;
