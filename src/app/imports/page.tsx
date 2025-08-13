'use client';
import { useState } from 'react';

export default function ImportsPage() {
  const [result, setResult] = useState('');
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/imports', { method: 'POST', body: fd });
    const json = await res.json();
    setResult(JSON.stringify(json, null, 2));
  }
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="file" name="file" className="text-black" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Upload CSV</button>
      </form>
      {result && <pre className="whitespace-pre-wrap text-xs">{result}</pre>}
      <div>
        <a className="underline" href="/templates/accounts_metrics.csv">accounts_metrics.csv</a>
        <a className="underline ml-4" href="/templates/videos_metrics.csv">videos_metrics.csv</a>
      </div>
    </div>
  );
}
