import { prisma } from '@/prisma';
import { responseWrapper } from '../utils/responseWrapper';
import { getEventById } from '../event/getEventbyEventId';
import { getUserByUserName } from '../getUserByUserName';

/**
 * Creates a new booking for an event by associating multiple users (guests).
 *
 * @param {Object} params - Parameters required to create a booking.
 * @param {string[]} params.usernames - Array of usernames to be added as guests.
 * @param {string} params.eventId - The ID of the event to book.
 * @param {string} params.startTime - Start time of the booking (ISO string).
 * @param {string} params.endTime - End time of the booking (ISO string).
 *
 * @returns {Promise<Object>} A response object containing:
 * - `status` (boolean): Indicates success or failure.
 * - `data` (object): The created booking if successful.
 * - `message` (string): Any success or error message.
 *
 * @example
 * const response = await createBooking({
 *   usernames: ["naruto", "luffy"],
 *   eventId: "evt_123",
 *   startTime: "2025-04-21T10:00:00Z",
 *   endTime: "2025-04-21T10:15:00Z",
 * });
 */

export const createBooking = async ({
  usernames,
  eventId,
  startTime,
  endTime,
}: {
  usernames: string[];
  eventId: string;
  startTime: string;
  endTime: string;
}) => {
  try {
    const event = await getEventById({ eventId });
    const guestIds = [];
    for (const username of usernames) {
      const userDetails = await getUserByUserName({ username });
      if (userDetails?.id) {
        guestIds.push(userDetails.id);
      }
    }
    if (!event) {
      return {
        response: {},
        message: 'no event is present please check the eventId',
        status: false,
      };
    }
    const newBooking = await bookingGuest({
      eventId: event?.id,
      startTime,
      endTime,
      guestIds,
    });
    return responseWrapper({
      status: true,
      data: newBooking,
      message: '',
    });
  } catch (error) {
    return responseWrapper({
      status: false,
      data: {},
      message: `${error}`,
    });
  }
};

/**
 * Creates a new booking for the given event, along with guest entries if guest IDs are provided.
 *
 * @param {Object} params - The booking details.
 * @param {string} params.eventId - The ID of the event for which the booking is created.
 * @param {string} params.startTime - The start time of the booking (ISO string).
 * @param {string} params.endTime - The end time of the booking (ISO string).
 * @param {number[]} params.guestIds - An array of guest user IDs to be linked to the booking.
 *
 * @returns {Promise<Booking>} The newly created booking record from the database.
 *
 * @example
 * const booking = await bookingGuest({
 *   eventId: "evt_456",
 *   startTime: "2025-04-21T11:00:00Z",
 *   endTime: "2025-04-21T11:15:00Z",
 *   guestIds: [1, 2, 3],
 * });
 */

const bookingGuest = async ({ eventId, startTime, endTime, guestIds }: CreateBooking) => {
  const newBooking = await prisma.booking.create({
    data: {
      eventId,
      startTime,
      endTime,
      ...(guestIds &&
        guestIds?.length > 0 && {
          bookingGuest: {
            createMany: {
              data: guestIds.map((id) => ({
                guestId: id,
              })),
            },
          },
        }),
    },
  });
  return newBooking;
};
