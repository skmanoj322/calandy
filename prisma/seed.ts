import { prisma } from '.';
import bcrypt from 'bcrypt';

export const SALT_ROUNDS = 10;

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashPassword;
};

// create two user one as guest and one as a host
async function main() {
  await prisma.user.upsert({
    where: { username: 'naruto' },
    update: {},
    create: {
      username: 'naruto',
      password: await encryptPassword('Manoj@123'),
      userConstraints: {
        create: {
          startTime: '09:00:00Z',
          endTime: '18:00:00Z',
        },
      },
      event: {
        create: {
          title: 'gym',
          description: 'cardio',
          slotSize: 15,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { username: 'luffy' },
    update: {},
    create: {
      username: 'luffy',
      password: await encryptPassword('Manoj@123'),
      userConstraints: {
        create: {
          startTime: '09:00:00Z', //HH:mm:ssZ
          endTime: '18:00:00Z',
        },
      },
      event: {
        create: {
          title: 'doctor',
          description: 'aksdksakdsa',
          slotSize: 15,
        },
      },
    },
  });
}

main()
  .then(async () => {
    console.log('DISSCONNECTED');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
