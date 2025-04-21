import { prisma } from '@/prisma';

export const getEventById = async ({ eventId }: { eventId: string }) => {
  const eventbyId = await prisma.event.findUnique({
    where: {
      eventId,
    },
  });

  return eventbyId;
};
