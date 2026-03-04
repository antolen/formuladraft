import { NextRequest, NextResponse } from 'next/server';
import { getDraftState, setDraftState } from '@/app/lib/redisClient';
import { TOTAL_DRIVERS } from '@/app/lib/draftOrder';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participant } = body as { participant: string };

    if (participant !== 'Anton') {
      return NextResponse.json({ success: false, error: 'NOT_ANTON' }, { status: 403 });
    }

    const draftState = await getDraftState();

    if (draftState.picks.length < TOTAL_DRIVERS) {
      return NextResponse.json({ success: false, error: 'DRAFT_INCOMPLETE' }, { status: 400 });
    }

    await setDraftState({ ...draftState, saved: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/draft/save error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
