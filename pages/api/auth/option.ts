import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { error } from 'console';
import { prisma } from '@/prisma';
import { decryptPassword } from '@/pages/lib/auth/utils';

export const Option: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass id into session too if needed
      if (token?.id) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const { username, password } = credentials;
        const userCredential = await prisma.user.findUnique({
          where: { username },
        });
        if (!userCredential) {
          return null;
        }
        const isCorrectPassword = await decryptPassword(password, userCredential.password);

        if (!isCorrectPassword) {
          return null;
        }

        return {
          id: userCredential.id.toString(),
          name: credentials.username,
        };
      },
    }),
  ],
};
