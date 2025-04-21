import { routeProtector } from '@/pages/lib/auth/routeProtector';
import { createNewEvent } from '@/pages/lib/event/createNewEvent';
import { responseWrapper } from '@/pages/lib/utils/responseWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(408).send({ message: 'Only post method is allowed' });
  }
  const userId = req.headers['user_id'];
  const username = req.headers['username'];
  const stringToNumber = Number(userId);
  const { title, description, slotSize } = req.body;
  let NewEvent;
  if (title && description && slotSize && typeof userId === 'string') {
    try {
      const data = await createNewEvent({
        userId: stringToNumber,
        description,
        slotSize,
        title,
      });
      NewEvent = responseWrapper({ data, status: true, message: '' });
    } catch (error) {
      NewEvent = responseWrapper({
        data: {},
        status: false,
        message: `${error}`,
      });

      return res.status(400).send(NewEvent);
    }
  }
  return res.send(NewEvent);
}
