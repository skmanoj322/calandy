/*
  Warnings:

  - You are about to drop the column `EventId` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - The required column `eventId` was added to the `Event` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `slotSize` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Event_EventId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "EventId",
ADD COLUMN     "eventId" TEXT NOT NULL,
DROP COLUMN "slotSize",
ADD COLUMN     "slotSize" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventId_key" ON "Event"("eventId");
