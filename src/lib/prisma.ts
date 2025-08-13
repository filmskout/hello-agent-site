import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_PROVIDER = 'postgresql';
  process.env.DATABASE_URL =
    'postgresql://USER:PASSWORD@prisma-postgres-indigo-xylophone/DATABASE';
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
