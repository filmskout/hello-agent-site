'use client';
import { useState } from 'react';
import { t, Locale } from '@/lib/i18n';

export default function AddAccountForm({ locale }: { locale: Locale }) {
  const [form, setForm] = useState({ platform: 'DOUYIN', handle: '', accountId: '', displayName: '', url: '' });
  const [msg, setMsg] = useState('');
  async function submit() {
    const res = await fetch('/api/accounts', { method: 'POST', body: JSON.stringify(form) });
    setMsg(res.ok ? '✅' : '❌');
  }
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
      <div className="font-bold mb-2">{t(locale, 'addAccount')}</div>
      <div className="flex flex-col gap-2">
        <select className="p-2 text-black" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
          <option value="DOUYIN">Douyin</option>
          <option value="KUAISHOU">Kuaishou</option>
          <option value="WECHAT_CHANNELS">视频号</option>
          <option value="XIAOHONGSHU">小红书</option>
        </select>
        <input className="p-2 text-black" placeholder="accountId" value={form.accountId} onChange={e => setForm({ ...form, accountId: e.target.value })} />
        <input className="p-2 text-black" placeholder="handle" value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value })} />
        <input className="p-2 text-black" placeholder="displayName" value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} />
        <input className="p-2 text-black" placeholder="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>{t(locale, 'addAccount')}</button>
        {msg && <span>{msg}</span>}
      </div>
    </div>
  );
}
