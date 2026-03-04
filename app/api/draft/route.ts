import { NextResponse } from 'next/server';
import { getDraftState, setDraftState } from '@/app/lib/redisClient';
import { generatePickOrder, currentPicker } from '@/app/lib/draftOrder';
import { GetDraftResponse } from '@/app/lib/draftTypes';
import { drivers } from '@/app/static/drivers';

const DEFAULT_STATE = { picks: [], saved: false, startedAt: null };

export async function GET() {
  try {
    let draftState = await getDraftState();

    // If this is truly a fresh start, persist it
    if (draftState.picks.length === 0 && !draftState.saved) {
      await setDraftState(DEFAULT_STATE);
    }

    const pickOrder = generatePickOrder();
    const pickedSlugs = new Set(draftState.picks.map((p) => p.driverSlug));
    const availableDriverSlugs = Object.keys(drivers).filter((slug) => !pickedSlugs.has(slug));
    const picker = currentPicker(draftState.picks.length);

    const response: GetDraftResponse = {
      draftState,
      pickOrder,
      currentPicker: picker,
      availableDriverSlugs,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/draft error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
