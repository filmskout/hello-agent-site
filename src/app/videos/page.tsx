export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    orderBy: { publishedAt: 'desc' },
    include: { SocialAccount: true, metrics: { orderBy: { timestamp: 'desc' }, take: 1 } },
    take: 50,
  });
  return (
    <table className="w-full text-sm">
      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="p-2 text-left">Platform</th>
          <th className="p-2 text-left">Title</th>
          <th className="p-2 text-left">Account</th>
          <th className="p-2 text-left">Views</th>
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {videos.map((v: any) => (
          <tr key={v.id} className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-700">
            <td className="p-2">{v.platform}</td>
            <td className="p-2">{v.title}</td>
            <td className="p-2">{v.SocialAccount?.handle}</td>
            <td className="p-2">{v.metrics[0]?.views ?? ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
