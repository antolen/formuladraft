'use client';

import { drivers } from '@/app/static/drivers';
import { DraftPick } from '@/app/lib/draftTypes';

type DriverGridProps = {
  availableDriverSlugs: string[];
  picks: DraftPick[];
  isMyTurn: boolean;
  onSelect: (driverSlug: string) => void;
  pendingDriver: string | null;
  pickLoading: boolean;
};

const TEAM_COLORS: Record<string, string> = {
  alpine: 'bg-pink-500',
  aston_martin: 'bg-green-700',
  audi: 'bg-gray-600',
  cadillac: 'bg-yellow-600',
  ferrari: 'bg-red-600',
  haas: 'bg-gray-700',
  mclaren: 'bg-orange-500',
  mercedes: 'bg-teal-500',
  racing_bulls: 'bg-blue-600',
  red_bull_racing: 'bg-blue-800',
  williams: 'bg-sky-500',
};

const PARTICIPANT_COLORS: Record<string, string> = {
  Michelle: 'bg-blue-500',
  Anna: 'bg-purple-500',
  Anton: 'bg-red-500',
  Mike: 'bg-green-500',
  Swim: 'bg-orange-500',
};

export default function DriverGrid({ availableDriverSlugs, picks, isMyTurn, onSelect, pendingDriver, pickLoading }: DriverGridProps) {
  const pickedMap = new Map(picks.map((p) => [p.driverSlug, p.participant]));
  const allDriverSlugs = Object.keys(drivers);

  return (
    <section className="mb-6">
      <h2 className="text-2xl mb-3">
        Drivers
        {isMyTurn && <span className="ml-3 text-sm text-red-500 font-bold">— Your pick!</span>}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {allDriverSlugs.map((slug) => {
          const driver = drivers[slug];
          const picker = pickedMap.get(slug);
          const isAvailable = availableDriverSlugs.includes(slug);
          const isPending = pendingDriver === slug;
          const teamColor = TEAM_COLORS[driver.team] ?? 'bg-gray-400';
          const pickerColor = picker ? (PARTICIPANT_COLORS[picker] ?? 'bg-gray-400') : '';

          let cardClass = 'text-left rounded-md p-5 transition-all relative overflow-hidden ';
          if (!isAvailable) {
            cardClass += 'bg-gray-100 opacity-50 cursor-default';
          } else if (isPending) {
            cardClass += 'bg-white ring-2 ring-red-500 ring-offset-1 cursor-pointer shadow-lg';
          } else if (isMyTurn) {
            cardClass += 'bg-white hover:ring-2 hover:ring-red-400 cursor-pointer';
          } else {
            cardClass += 'bg-white cursor-default';
          }

          return (
            <button
              key={slug}
              disabled={!isAvailable || !isMyTurn || pickLoading}
              onClick={() => onSelect(slug)}
              className={cardClass}
            >
              {driver.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={driver.image}
                  alt=""
                  className="absolute right-0 top-0 h-full w-2/5 object-cover object-top pointer-events-none"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div className="relative pr-12">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${teamColor}`} />
                  <span className={`text-sm font-semibold truncate ${!isAvailable ? 'text-gray-400' : 'text-black'}`}>
                    {driver.name}
                  </span>
                </div>
                <div className="text-xs text-gray-400 capitalize">{driver.team.replace(/_/g, ' ')}</div>
                <div className="mt-1.5 h-[22px]">
                  {picker && (
                    <span className={`inline-block text-white text-xs font-bold px-2 py-0.5 rounded ${pickerColor}`}>
                      {picker}
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded bg-red-500">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
