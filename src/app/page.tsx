export const runtime = 'nodejs';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '@/lib/prisma';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import { t, Locale, defaultLocale } from '@/lib/i18n';
import { cookies } from 'next/headers';
import dayjs from 'dayjs';

export default async function Dashboard() {
  const langCookie = (await cookies()).get('lang')?.value as Locale | undefined;
  const locale = langCookie || defaultLocale;
  const accountsCount = await prisma.socialAccount.count();
  const alertsCount = await prisma.alertRule.count({ where: { active: true } });

  const followerMetrics = await prisma.metric.findMany({
    where: { scope: 'ACCOUNT' },
    orderBy: { timestamp: 'asc' },
    take: 30,
  });
  const followerLabels = followerMetrics.map((m: any) => dayjs(m.timestamp).format('MM-DD'));
  const followerData = followerMetrics.map((m: any) => m.followers ?? 0);

  const viewMetrics = await prisma.metric.findMany({
    where: { scope: 'VIDEO' },
    orderBy: { timestamp: 'asc' },
    take: 30,
  });
  const viewLabels = viewMetrics.map((m: any) => dayjs(m.timestamp).format('MM-DD'));
  const viewData = viewMetrics.map((m: any) => m.views ?? 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">{t(locale, 'accounts')}: {accountsCount}</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">7d Followers: {followerData.slice(-7).reduce((a: number,b: number)=>a+b,0)}</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">7d Views: {viewData.slice(-7).reduce((a: number,b: number)=>a+b,0)}</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">{t(locale,'alerts')}: {alertsCount}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <TimeSeriesChart labels={followerLabels} data={followerData} title="Followers" />
        <TimeSeriesChart labels={viewLabels} data={viewData} title="Views" />
      </div>
    </div>
  );
}
