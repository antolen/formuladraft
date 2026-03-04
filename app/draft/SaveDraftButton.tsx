'use client';

import { TOTAL_DRIVERS } from '@/app/lib/draftOrder';

type SaveDraftButtonProps = {
  selectedName: string | null;
  picksCount: number;
  saved: boolean;
  onSave: () => void;
  onReset: () => void;
  saveLoading: boolean;
  resetLoading: boolean;
};

export default function SaveDraftButton({
  selectedName,
  picksCount,
  saved,
  onSave,
  onReset,
  saveLoading,
  resetLoading,
}: SaveDraftButtonProps) {
  const isAnton = selectedName === 'Anton';
  const isComplete = picksCount >= TOTAL_DRIVERS;
  const canSave = isAnton && isComplete && !saved;
  const canReset = isAnton;

  if (!isAnton) {
    return (
      <section className="mb-6">
        <p className="text-sm text-gray-400">Only Anton can save or reset the draft.</p>
      </section>
    );
  }

  return (
    <section className="mb-6 pt-4 pb-4 pr-4 border-red-500 border-t-8 border-r-8 border-b-8 rounded-r-2xl">
      <h2 className="text-2xl mb-3">Admin Controls</h2>
      <div className="flex flex-wrap gap-3">
        {saved ? (
          <div className="py-2 px-5 bg-gray-100 rounded-md text-sm font-bold text-gray-500">
            Draft Saved ✓
          </div>
        ) : (
          <button
            onClick={onSave}
            disabled={!canSave || saveLoading}
            title={!isComplete ? 'All drivers must be picked first' : ''}
            className={`py-2 px-5 rounded-md font-bold text-sm transition-colors ${
              canSave
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {saveLoading ? 'Saving…' : 'Save Draft'}
          </button>
        )}
        <button
          onClick={onReset}
          disabled={!canReset || resetLoading}
          className="py-2 px-5 rounded-md font-bold text-sm bg-white text-black border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resetLoading ? 'Resetting…' : 'Reset Draft'}
        </button>
      </div>
      {!isComplete && !saved && (
        <p className="mt-2 text-xs text-gray-400">
          {TOTAL_DRIVERS - picksCount} pick{TOTAL_DRIVERS - picksCount !== 1 ? 's' : ''} remaining before you can save.
        </p>
      )}
    </section>
  );
}
