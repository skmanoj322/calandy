-- AlterTable
ALTER TABLE "UserConstraints" ADD COLUMN     "days" TEXT DEFAULT '[1,2,3,4,5]',
ALTER COLUMN "endTime" SET DEFAULT '17:00',
ALTER COLUMN "startTime" SET DEFAULT '9:00';
