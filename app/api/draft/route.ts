import { NextResponse } from 'next/server';
import { getDraftState } from '@/app/lib/redisClient';

export const dynamic = 'force-dynamic';
import { generatePickOrder, currentPicker } from '@/app/lib/draftOrder';
import { GetDraftResponse } from '@/app/lib/draftTypes';
import { drivers } from '@/app/static/drivers';

export async function GET() {
  try {
    const draftState = await getDraftState();

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
