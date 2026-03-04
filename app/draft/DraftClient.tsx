'use client';

import { useEffect, useRef, useState } from 'react';
import { GetDraftResponse } from '@/app/lib/draftTypes';
import { TOTAL_DRIVERS, PARTICIPANTS } from '@/app/lib/draftOrder';
import DriverGrid from './DriverGrid';
import PicksSummary from './PicksSummary';
import SaveDraftButton from './SaveDraftButton';

export default function DraftClient() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [draftData, setDraftData] = useState<GetDraftResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pickLoading, setPickLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchDraft = async () => {
    try {
      const res = await fetch('/api/draft');
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.draftState) {
        setDraftData(data as GetDraftResponse);
      }
    } catch {
      // silently fail on poll
    } finally {
      setLoading(false);
    }
  };

  const startPolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchDraft, 3500);
  };

  useEffect(() => {
    fetchDraft();
    startPolling();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  const handlePick = async (driverSlug: string) => {
    if (!selectedName || pickLoading) return;
    setPickLoading(true);
    try {
      const res = await fetch('/api/draft/pick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant: selectedName, driverSlug }),
      });
      const data = await res.json();
      if (!data.success) {
        const messages: Record<string, string> = {
          NOT_YOUR_TURN: "It's not your turn yet!",
          DRIVER_ALREADY_PICKED: 'That driver has already been picked.',
          DRAFT_SAVED: 'The draft has been locked.',
          DRAFT_COMPLETE: 'All drivers have been picked.',
        };
        showError(messages[data.error] ?? 'Something went wrong.');
      } else {
        await fetchDraft();
        startPolling();
      }
    } catch {
      showError('Network error. Please try again.');
    } finally {
      setPickLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedName || saveLoading) return;
    setSaveLoading(true);
    try {
      const res = await fetch('/api/draft/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant: selectedName }),
      });
      const data = await res.json();
      if (!data.success) {
        showError(data.error === 'DRAFT_INCOMPLETE' ? 'All drivers must be picked first.' : 'Only Anton can save the draft.');
      } else {
        await fetchDraft();
      }
    } catch {
      showError('Network error. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleReset = async () => {
    if (!selectedName || resetLoading) return;
    setResetLoading(true);
    try {
      const res = await fetch('/api/draft/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant: selectedName }),
      });
      const data = await res.json();
      if (!data.success) {
        showError('Only Anton can reset the draft.');
      } else {
        await fetchDraft();
        startPolling();
      }
    } catch {
      showError('Network error. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8 sm:p-24 sm:py-12">
        <p className="text-gray-400">Loading draft…</p>
      </main>
    );
  }

  if (!draftData) {
    return (
      <main className="min-h-screen p-8 sm:p-24 sm:py-12">
        <p className="text-red-500">Failed to load draft state. Check your connection.</p>
      </main>
    );
  }

  if (!selectedName) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-10">F1 Snake Draft 2026</h1>
        <div className="border-red-500 border-t-8 border-r-8 border-b-8 rounded-r-2xl pt-8 pb-8 pr-10 pl-6">
          <h2 className="text-2xl font-bold mb-6">Who are you?</h2>
          <div className="flex flex-col gap-3">
            {PARTICIPANTS.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedName(name)}
                className="px-8 py-4 text-lg font-bold rounded-md border-2 border-white hover:bg-red-500 hover:border-red-500 transition-colors text-left"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const { draftState, currentPicker, availableDriverSlugs } = draftData;
  const picksCount = draftState.picks.length;
  const isMyTurn = selectedName === currentPicker;
  const isDraftComplete = picksCount >= TOTAL_DRIVERS;

  return (
    <main className="min-h-screen p-8 sm:p-24 sm:py-12 overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">F1 Snake Draft 2026</h1>

      {errorMessage && (
        <div className="mb-4 py-3 px-4 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <div className="border-red-500 border-t-8 border-r-8 border-b-8 rounded-r-2xl pt-4 pb-4 pr-4">

      {/* Status banner */}
      <section className="mb-6">
        <p className="text-sm text-gray-400 mb-2">
          Picking as: <strong className="text-white">{selectedName}</strong>
        </p>
        {draftState.saved ? (
          <p className="text-lg font-bold text-green-600">Draft is locked! 🏁</p>
        ) : isDraftComplete ? (
          <p className="text-lg font-bold">All picks in — waiting for Anton to save.</p>
        ) : (
          <>
            <p className="text-lg font-bold">
              Pick {picksCount + 1} of {TOTAL_DRIVERS} —{' '}
              <span className="text-red-500">{currentPicker}&apos;s turn</span>
            </p>
            {isMyTurn && (
              <p className="text-sm text-red-500 font-semibold mt-1">It&apos;s your turn! Select a driver below.</p>
            )}
            {!isMyTurn && (
              <p className="text-sm text-gray-400 mt-1">
                Waiting for {currentPicker} to pick…
              </p>
            )}
          </>
        )}
      </section>

      <DriverGrid
        availableDriverSlugs={availableDriverSlugs}
        picks={draftState.picks}
        isMyTurn={isMyTurn}
        onPick={handlePick}
        pickLoading={pickLoading}
      />
      <PicksSummary picks={draftState.picks} />

      <SaveDraftButton
        selectedName={selectedName}
        picksCount={picksCount}
        saved={draftState.saved}
        onSave={handleSave}
        onReset={handleReset}
        saveLoading={saveLoading}
        resetLoading={resetLoading}
      />

      </div>
    </main>
  );
}
