export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';
import AddAccountForm from './AddAccountForm';
import { cookies } from 'next/headers';
import { Locale, defaultLocale, t } from '@/lib/i18n';

export default async function AccountsPage() {
  const lang = (cookies().get('lang')?.value as Locale) || defaultLocale;
  const accounts = await prisma.socialAccount.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="space-y-4">
      <AddAccountForm locale={lang} />
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-2 text-left">Platform</th>
            <th className="p-2 text-left">Handle</th>
            <th className="p-2 text-left">{t(lang,'settings')}</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <tr key={a.id} className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-700">
              <td className="p-2">{a.platform}</td>
              <td className="p-2">{a.handle}</td>
              <td className="p-2">{a.displayName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
