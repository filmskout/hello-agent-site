export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';
import AddAlertForm from './AddAlertForm';

export default async function AlertsPage() {
  const alerts = await prisma.alertRule.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="space-y-4">
      <AddAlertForm />
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Metric</th>
            <th className="p-2 text-left">Threshold</th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {alerts.map((a: any) => (
            <tr key={a.id} className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-700">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.metric}</td>
              <td className="p-2">{a.direction} {a.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
