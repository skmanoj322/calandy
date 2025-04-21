import { NextApiRequest } from 'next';

/**
 * Extracts the `userId` and `username` from the request headers.
 *
 * @param {NextApiRequest} req - The incoming Next.js API request object.
 *
 * @returns An object containing the numeric `userId` and the `username` (if present).
 *
 * @example
 * const { userId, username } = extractUserIdfromreq(req);
 * console.log(userId); // e.g., 42
 */

export const extractUserIdfromreq = (req: NextApiRequest) => {
  const userId = req.headers['user_id'] as string;
  const username = req.headers['username'];

  return { userId: Number(userId), username };
};
