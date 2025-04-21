import { extractUserIdfromreq } from '@/pages/lib/utils/extractUserId';
import { responseWrapper } from '@/pages/lib/utils/responseWrapper';
import { prisma } from '@/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
type STATUS = 'CONFIRMED' | 'CANCELLED' | 'PENDING';
const updateBooking = async (req: NextApiRequest, res: NextApiResponse) => {
  const { bookingId, status }: { bookingId: string; status: STATUS } = req.body;
  const { userId } = extractUserIdfromreq(req);
  if (typeof bookingId !== 'string' || typeof status !== 'string') {
    return res.status(400).send({
      message: 'enter the valid booking id',
      status: false,
      data: {},
    });
  }

  const bookingGuestRecord = await prisma.bookingGuest.findFirst({
    where: {
      booking: {
        bookingId,
      },
      guestId: userId,
    },
  });

  if (!bookingGuestRecord || !bookingGuestRecord.bookingId || !bookingGuestRecord.bookingStatus) {
    return res.send({
      message: 'invalid booking guest record',
    });
  }
  try {
    const updateBooking = await prisma.bookingGuest.update({
      where: {
        id: bookingGuestRecord.id,
      },
      data: {
        bookingStatus: status,
      },
    });
    return res.send(
      responseWrapper({
        data: updateBooking,
        message: 'status Updated sucessfully',
        status: true,
      })
    );
  } catch (error) {
    return res.status(400).send(
      responseWrapper({
        data: {},
        message: `${error}`,
        status: false,
      })
    );
  }
};

export default updateBooking;
