import { cookies } from 'next/headers';
import { Locale, defaultLocale } from '@/lib/i18n';

export default async function SettingsPage() {
  const lang = ((await cookies()).get('lang')?.value as Locale) || defaultLocale;
  return (
    <div className="space-y-4">
      <form action="/api/settings" method="post" className="flex gap-2 items-center">
        <input type="hidden" name="type" value="lang" />
        <select name="lang" defaultValue={lang} className="p-2 text-black">
          <option value="zh-CN">中文</option>
          <option value="en">English</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Save</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">Douyin API - README</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">Kuaishou API - README</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">WeChat Channels API - README</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">Xiaohongshu API - README</div>
        <div className="p-4 rounded bg-gray-100 dark:bg-gray-700 col-span-full">Webhook/Zapier - POST JSON with secret token</div>
      </div>
    </div>
  );
}
