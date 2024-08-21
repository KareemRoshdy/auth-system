-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetPasswordToke" DROP NOT NULL,
ALTER COLUMN "resetPasswordExpiresAt" DROP NOT NULL,
ALTER COLUMN "verificationToke" DROP NOT NULL,
ALTER COLUMN "verificationTokeExpiresAt" DROP NOT NULL;
