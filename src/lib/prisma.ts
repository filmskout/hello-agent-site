import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

if (!process.env.DATABASE_URL) {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    process.env.DATABASE_PROVIDER = 'postgresql';
    // Placeholder; replace with real Supabase Postgres connection string
    process.env.DATABASE_URL = process.env.SUPABASE_URL.replace('https://', 'postgresql://postgres:postgres@') + '/postgres';
  } else {
    process.env.DATABASE_PROVIDER = 'sqlite';
    process.env.DATABASE_URL = 'file:./dev.db';
  }
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
