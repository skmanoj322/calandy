import { prisma } from '@/prisma';
import { responseWrapper } from '../utils/responseWrapper';

/**
 * Retrieves all bookings for events created by a specific user.
 *
 * @param {Object} params - Parameters to query user bookings.
 * @param {number} params.userId - The ID of the user whose event bookings are to be fetched.
 *
 * @returns  An object containing the user's events and their associated bookings,
 * or null if the user is not found, or an Error if something goes wrong.
 *
 * @example
 * const result = await getBookingById({ userId: 5 });
 * console.log(result?.event[0].booking); // Access bookings from first event
 */

export const getBookingById = async ({ userId }: { userId: number }) => {
  try {
    const getAllBookingByusers = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        event: {
          include: {
            booking: true,
          },
        },
      },
    });
    return getAllBookingByusers;
  } catch (error) {
    return error;
  }
};
