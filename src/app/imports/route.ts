export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { prisma } from '@/lib/prisma';
import { Platform } from '@prisma/client';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File;
  const text = await file.text();
  const records = parse(text, { columns: true, skip_empty_lines: true });
  let inserted = 0;
  for (const row of records) {
    const platform = row.platform as Platform;
    // upsert account
    const account = await prisma.socialAccount.upsert({
      where: { platform_accountId: { platform, accountId: row.account_id } },
      update: { handle: row.handle },
      create: { platform, accountId: row.account_id, handle: row.handle },
    });
    if (row.video_id) {
      const video = await prisma.video.upsert({
        where: { platform_videoId: { platform, videoId: row.video_id } },
        update: { title: row.title, accountId: account.id, url: row.url },
        create: {
          platform,
          videoId: row.video_id,
          accountId: account.id,
          title: row.title,
          url: row.url,
          publishedAt: row.date ? new Date(row.date) : undefined,
        },
      });
      await prisma.metric.create({
        data: {
          scope: 'VIDEO',
          videoRef: video.id,
          timestamp: new Date(row.date),
          views: parseInt(row.views || '0'),
          likes: parseInt(row.likes || '0'),
          comments: parseInt(row.comments || '0'),
          shares: parseInt(row.shares || '0'),
          saves: parseInt(row.saves || '0'),
        },
      });
    } else {
      await prisma.metric.create({
        data: {
          scope: 'ACCOUNT',
          accountRef: account.id,
          timestamp: new Date(row.date),
          followers: parseInt(row.followers || '0'),
          likes: parseInt(row.likes || '0'),
          comments: parseInt(row.comments || '0'),
          shares: parseInt(row.shares || '0'),
        },
      });
    }
    inserted++;
  }
  return NextResponse.json({ inserted });
}
