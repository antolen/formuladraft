import { NextRequest, NextResponse } from 'next/server';
import { getDraftState, setDraftState } from '@/app/lib/redisClient';
import { currentPicker, generatePickOrder } from '@/app/lib/draftOrder';
import { DraftPick } from '@/app/lib/draftTypes';
import { drivers } from '@/app/static/drivers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participant, driverSlug } = body as { participant: string; driverSlug: string };

    if (!participant || !driverSlug) {
      return NextResponse.json({ success: false, error: 'MISSING_FIELDS' }, { status: 400 });
    }

    const draftState = await getDraftState();

    if (draftState.saved) {
      return NextResponse.json({ success: false, error: 'DRAFT_SAVED' }, { status: 409 });
    }

    const picker = currentPicker(draftState.picks.length);
    if (!picker) {
      return NextResponse.json({ success: false, error: 'DRAFT_COMPLETE' }, { status: 400 });
    }

    if (participant !== picker) {
      return NextResponse.json({ success: false, error: 'NOT_YOUR_TURN' }, { status: 400 });
    }

    const alreadyPicked = draftState.picks.some((p) => p.driverSlug === driverSlug);
    if (alreadyPicked) {
      return NextResponse.json({ success: false, error: 'DRIVER_ALREADY_PICKED' }, { status: 400 });
    }

    const newPick: DraftPick = {
      driverSlug,
      participant,
      pickNumber: draftState.picks.length,
    };

    const updatedState = {
      ...draftState,
      picks: [...draftState.picks, newPick],
      startedAt: draftState.startedAt ?? new Date().toISOString(),
    };

    await setDraftState(updatedState);

    const nextPicker = currentPicker(updatedState.picks.length);
    const pickedSlugs = new Set(updatedState.picks.map((p) => p.driverSlug));
    const availableDriverSlugs = Object.keys(drivers).filter((slug) => !pickedSlugs.has(slug));
    const pickOrder = generatePickOrder();

    return NextResponse.json({
      success: true,
      draftState: updatedState,
      currentPicker: nextPicker,
      availableDriverSlugs,
      pickOrder,
    });
  } catch (error) {
    console.error('POST /api/draft/pick error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
