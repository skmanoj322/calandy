import { getAlltheGuest } from '@/pages/lib/booking/getAllTheGuest';
import { NextApiRequest, NextApiResponse } from 'next';

const getAllInviteesOFTheBooking = async (req: NextApiRequest, res: NextApiResponse) => {
  const { bookingId } = req.query;
  if (!bookingId || Array.isArray(bookingId)) {
    return res.status(400).send({
      message: 'booking id is not valid',
      status: false,
    });
  }
  const invitieesList = await getAlltheGuest({ bookingId });

  return res.send(invitieesList);
};
export default getAllInviteesOFTheBooking;
