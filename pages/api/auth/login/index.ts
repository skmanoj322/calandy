import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.status(200).json({ message: 'Authorized', user: token });
}
