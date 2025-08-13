import { prisma } from '../src/lib/prisma';
import dayjs from 'dayjs';

async function main() {
  const platforms = ['DOUYIN','KUAISHOU','WECHAT_CHANNELS','XIAOHONGSHU'] as const;
  for (const [i,p] of platforms.entries()) {
    const account = await prisma.socialAccount.create({
      data: {
        platform: p,
        accountId: `acc${i}`,
        handle: `@sample_${i}`,
        displayName: `Sample ${p}`,
        url: 'https://example.com',
      }
    });
    for (let d=0; d<30; d++) {
      await prisma.metric.create({
        data: {
          scope: 'ACCOUNT',
          accountRef: account.id,
          timestamp: dayjs().subtract(d,'day').toDate(),
          followers: 100 + d,
        }
      });
    }
  }

  for (let i=0;i<10;i++) {
    const platform = platforms[i % platforms.length];
    const account = await prisma.socialAccount.findFirst({ where: { platform } });
    if (!account) continue;
    const video = await prisma.video.create({
      data: {
        platform,
        accountId: account.id,
        videoId: `vid${i}`,
        title: `Video ${i}`,
      }
    });
    await prisma.metric.create({
      data: {
        scope: 'VIDEO',
        videoRef: video.id,
        timestamp: new Date(),
        views: 1000 + i * 100,
        likes: 100 + i,
      }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
