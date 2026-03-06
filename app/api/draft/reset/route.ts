import { NextRequest, NextResponse } from 'next/server';
import { kvDel, DRAFT_KEY } from '@/app/lib/redisClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participant } = body as { participant: string };

    if (participant !== 'Anton') {
      return NextResponse.json({ success: false, error: 'NOT_ANTON' }, { status: 403 });
    }

    await kvDel(DRAFT_KEY);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/draft/reset error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
