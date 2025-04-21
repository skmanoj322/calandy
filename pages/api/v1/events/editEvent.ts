import { editEvent } from '@/pages/lib/event/editEvent';
import { responseWrapper } from '@/pages/lib/utils/responseWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, eventId, slotSize } = req.body;

  const Event = await editEvent({
    eventId,
    payload: { title, description, slotSize },
  });
  const parseEvent = responseWrapper({
    data: Event,
    message: '',
    status: true,
  });
  return res.send(parseEvent);
}
