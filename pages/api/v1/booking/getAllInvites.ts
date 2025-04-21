import { extractUserIdfromreq } from '@/pages/lib/utils/extractUserId';
import { responseWrapper } from '@/pages/lib/utils/responseWrapper';
import { prisma } from '@/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// gets you all the invites of the user

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = extractUserIdfromreq(req);

  const getInvitees = await prisma.bookingGuest.findMany({
    where: {
      guestId: userId,
    },
    include: {
      booking: {
        include: {
          event: true,
        },
      },
    },
  });

  return res.send(
    responseWrapper({
      data: getInvitees,
      message: '',
      status: true,
    })
  );
};

export default handler;
