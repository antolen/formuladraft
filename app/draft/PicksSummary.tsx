'use client';

import { DraftPick } from '@/app/lib/draftTypes';
import { PARTICIPANTS } from '@/app/lib/draftOrder';
import { drivers } from '@/app/static/drivers';

type PicksSummaryProps = {
  picks: DraftPick[];
};

const PARTICIPANT_COLORS: Record<string, string> = {
  Michelle: 'border-blue-500',
  Anna: 'border-purple-500',
  Anton: 'border-red-500',
  Mike: 'border-green-500',
  Swim: 'border-orange-500',
};

export default function PicksSummary({ picks }: PicksSummaryProps) {
  const picksByParticipant = Object.fromEntries(
    PARTICIPANTS.map((p) => [p, picks.filter((pick) => pick.participant === p)])
  );

  return (
    <section className="mb-6">
      <h2 className="text-2xl mb-3">Draft Picks</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {PARTICIPANTS.map((participant) => {
          const participantPicks = picksByParticipant[participant];
          const borderColor = PARTICIPANT_COLORS[participant] ?? 'border-gray-400';

          return (
            <div key={participant} className={`bg-white rounded-md p-3 border-l-4 ${borderColor}`}>
              <h3 className="font-bold text-sm mb-2 text-black">{participant}</h3>
              {participantPicks.length === 0 ? (
                <p className="text-gray-300 text-xs">No picks yet</p>
              ) : (
                <ul className="space-y-1">
                  {participantPicks.map((pick) => (
                    <li key={pick.driverSlug} className="text-xs text-gray-700">
                      {drivers[pick.driverSlug]?.name ?? pick.driverSlug}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
