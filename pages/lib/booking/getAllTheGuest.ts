import { prisma } from '@/prisma';
import { responseWrapper } from '../utils/responseWrapper';
// get all the guest form booking id
export const getAlltheGuest = async ({ bookingId }: { bookingId: string }) => {
  try {
    const getAlltheguestFromBooking = await prisma.booking.findUnique({
      where: {
        bookingId: bookingId,
      },
      select: {
        bookingGuest: {
          select: {
            guest: {
              select: {
                username: true,
                UserId: true,
              },
            },
          },
        },
      },
    });

    return responseWrapper({
      data: getAlltheguestFromBooking,
      message: `list of all the guest of booking${bookingId}`,
      status: true,
    });
  } catch (error) {
    return responseWrapper({
      data: {},
      message: `${error}`,
      status: true,
    });
  }
};
