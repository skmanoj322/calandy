import { prisma } from '@/prisma';

/**
 * Fetches a user record from the database by their username.
 *
 * @param {Object} params - Parameters for querying the user.
 * @param {string} params.username - The username of the user to retrieve.
 *
 * @returns  The user object if found, or null if no user exists with the given username.
 *
 * @example
 * const user = await getUserByUserName({ username: "naruto" });
 * if (user) {
 *   console.log(user.id); // Access user ID or other fields
 * }
 */

export const getUserByUserName = async ({ username }: { username: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};
