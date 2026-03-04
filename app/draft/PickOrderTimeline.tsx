'use client';

import { DraftPick } from '@/app/lib/draftTypes';
import { drivers } from '@/app/static/drivers';

type PickOrderTimelineProps = {
  pickOrder: string[];
  picks: DraftPick[];
};

const PARTICIPANT_COLORS: Record<string, string> = {
  Michelle: 'bg-blue-500',
  Anna: 'bg-purple-500',
  Anton: 'bg-red-500',
  Mike: 'bg-green-500',
  Swim: 'bg-orange-500',
};

export default function PickOrderTimeline({ pickOrder, picks }: PickOrderTimelineProps) {
  const currentSlot = picks.length;

  return (
    <section className="mb-6 pt-4 pb-4 pr-4 border-red-500 border-t-8 border-r-8 border-b-8 rounded-r-2xl">
      <h2 className="text-2xl mb-3">Pick Order</h2>
      <div className="flex overflow-x-auto gap-2 pb-2">
        {pickOrder.map((participant, index) => {
          const pick = picks[index];
          const isCurrent = index === currentSlot;
          const isDone = index < currentSlot;
          const color = PARTICIPANT_COLORS[participant] ?? 'bg-gray-400';

          return (
            <div
              key={index}
              className={`flex-shrink-0 w-[100px] rounded-md p-2 text-center text-xs transition-all ${
                isCurrent
                  ? 'ring-2 ring-red-500 bg-white'
                  : isDone
                  ? 'bg-gray-100 opacity-60'
                  : 'bg-white'
              }`}
            >
              <div className={`text-white text-[10px] font-bold rounded px-1 py-0.5 mb-1 ${color}`}>
                #{index + 1} {participant}
              </div>
              {pick ? (
                <span className="text-black font-semibold text-[11px] leading-tight block">
                  {drivers[pick.driverSlug]?.name ?? pick.driverSlug}
                </span>
              ) : isCurrent ? (
                <span className="text-red-500 font-bold text-[11px]">Picking…</span>
              ) : (
                <span className="text-gray-300 text-[11px]">—</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
