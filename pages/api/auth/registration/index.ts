import { createUserRegestration } from '@/pages/lib/auth/registration';
import { prisma } from '@/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = await createUserRegestration({ username, password });

    if (user === 'User already exist') {
      return res.send({ message: user });
    }
    return res.json(user);
  } else {
    return res.status(408).send({ message: 'only post method is allowed' });
  }
}
