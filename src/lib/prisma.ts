/* eslint-disable @typescript-eslint/no-explicit-any */
export const prisma: any = {
  socialAccount: {
    findMany: async () => [],
    count: async () => 0,
    create: async () => ({}),
    upsert: async () => ({ id: '0' }),
  },
  alertRule: {
    findMany: async () => [],
    count: async () => 0,
    create: async () => ({}),
  },
  video: {
    findMany: async () => [],
    upsert: async () => ({ id: '0', metrics: [] }),
  },
  metric: {
    findMany: async () => [],
    create: async () => ({}),
  },
};
