export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  try {
    await prisma.socialAccount.create({ data });
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse('error', { status: 400 });
  }
}
