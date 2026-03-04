'use client';

import { PARTICIPANTS } from '@/app/lib/draftOrder';

type NameSelectorProps = {
  selectedName: string | null;
  onSelect: (name: string) => void;
};

export default function NameSelector({ selectedName, onSelect }: NameSelectorProps) {
  return (
    <section className="mb-6">
      <h2 className="text-2xl mb-3">Who are you?</h2>
      <div className="flex flex-wrap gap-2">
        {PARTICIPANTS.map((name) => {
          const isSelected = selectedName === name;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className={`py-2 px-5 rounded-md font-bold text-sm transition-colors ${
                isSelected
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
      {selectedName && (
        <p className="mt-3 text-sm text-gray-500">
          Picking as: <span className="font-bold text-white">{selectedName}</span>
        </p>
      )}
    </section>
  );
}
