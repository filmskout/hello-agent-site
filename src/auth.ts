import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [], // email/passwordless provider can be added later
  session: { strategy: 'jwt' },
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config);
