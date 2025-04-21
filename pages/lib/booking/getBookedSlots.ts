import { prisma } from '@/prisma';
import { Prisma } from '@prisma/client';
import { responseWrapper } from '../utils/responseWrapper';

/**
 * Fetches an event's slot-related information including bookings made for that event.
 *
 * @param {Object} params - Parameters for querying the event.
 * @param {string} params.eventId - The ID of the event to query.
 *
 * @returns  The event's user ID, slot size, and its bookings, or null if no event is found.
 *
 * @example
 * const slots = await getBookedSlots({ eventId: "fbc5c079-4dcc-4aad-b419-ec0770d32940" });
 * console.log(slots?.booking); // Array of booking time ranges
 */

export const getBookedSlots = async ({ eventId }: { eventId: string }) => {
  const bookedSlot = await prisma.event.findUnique({
    where: {
      eventId,
    },
    select: {
      userId: true,
      slotSize: true,
      booking: {
        select: {
          id: true,
          startTime: true,
          endTime: true,
        },
      },
    },
  });

  return bookedSlot;
};

export const getBlockSlots = async ({ eventId }: { eventId: string }) => {
  try {
    const bookedSlot = await getBookedSlots({ eventId });
    return responseWrapper<EventWithSlots>({
      data: bookedSlot,
      message: '',
      status: true,
    });
  } catch (error) {
    return responseWrapper({
      data: {},
      message: `${error}`,
      status: false,
    });
  }
};
export type EventWithSlots = Prisma.PromiseReturnType<typeof getBookedSlots>;
