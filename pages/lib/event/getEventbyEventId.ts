import { prisma } from '@/prisma';
// gets eventBy its id
export const getEventById = async ({ eventId }: { eventId: string }) => {
  const eventbyId = await prisma.event.findUnique({
    where: {
      eventId,
    },
  });

  return eventbyId;
};
