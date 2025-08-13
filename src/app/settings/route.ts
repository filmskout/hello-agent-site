import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  if (form.get('type') === 'lang') {
    const lang = form.get('lang') as string;
    const res = NextResponse.redirect('/settings');
    res.cookies.set('lang', lang);
    return res;
  }
  return NextResponse.json({ ok: true });
}
