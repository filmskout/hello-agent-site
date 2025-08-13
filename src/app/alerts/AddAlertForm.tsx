'use client';
import { useState } from 'react';

export default function AddAlertForm() {
  const [form, setForm] = useState({ name: '', metric: 'followers', threshold: 0, direction: 'above' });
  const [msg, setMsg] = useState('');
  async function submit() {
    const res = await fetch('/alerts', { method: 'POST', body: JSON.stringify(form) });
    setMsg(res.ok ? '✅' : '❌');
  }
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
      <div className="flex flex-col gap-2">
        <input className="p-2 text-black" placeholder="name" value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} />
        <input className="p-2 text-black" placeholder="metric" value={form.metric} onChange={e=>setForm({ ...form, metric: e.target.value })} />
        <input type="number" className="p-2 text-black" placeholder="threshold" value={form.threshold} onChange={e=>setForm({ ...form, threshold: Number(e.target.value) })} />
        <select className="p-2 text-black" value={form.direction} onChange={e=>setForm({ ...form, direction: e.target.value })}>
          <option value="above">above</option>
          <option value="below">below</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>Add</button>
        {msg && <span>{msg}</span>}
      </div>
    </div>
  );
}
