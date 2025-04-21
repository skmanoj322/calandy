import { prisma } from '@/prisma';
import { responseWrapper } from '../utils/responseWrapper';

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
      data: error,
      message: '',
      status: true,
    });
  }
};
