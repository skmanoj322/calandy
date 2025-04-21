import { prisma } from '@/prisma';
import { encryptPassword } from '../utils';

export async function createUserRegestration({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    return 'User already exist';
  }

  const hashPassword = await encryptPassword(password);

  const create = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
    },
    select: {
      username: true,
      email: true,
    },
  });

  return create;
}
