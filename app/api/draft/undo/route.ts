import { NextResponse } from 'next/server';
import { getDraftState, setDraftState } from '@/app/lib/redisClient';

export async function POST(req: Request) {
  try {
    const { participant } = await req.json();
    const state = await getDraftState();

    if (state.saved) {
      return NextResponse.json({ success: false, error: 'DRAFT_SAVED' });
    }

    // Find the index of this participant's most recent pick (scanning backwards)
    let lastPickIndex = -1;
    for (let i = state.picks.length - 1; i >= 0; i--) {
      if (state.picks[i].participant === participant) {
        lastPickIndex = i;
        break;
      }
    }

    if (lastPickIndex === -1) {
      return NextResponse.json({ success: false, error: 'NO_PICKS_TO_UNDO' });
    }

    // Rewind to just before the user's last pick (removing their pick + any picks made after)
    state.picks = state.picks.slice(0, lastPickIndex);
    await setDraftState(state);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
