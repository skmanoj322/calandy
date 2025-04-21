/*
  Warnings:

  - You are about to drop the column `eventId` on the `BookingGuest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookingGuest" DROP CONSTRAINT "BookingGuest_guestId_fkey";

-- AlterTable
ALTER TABLE "BookingGuest" DROP COLUMN "eventId";
