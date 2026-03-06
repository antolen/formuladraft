'use client';

import { useEffect, useRef, useState } from 'react';
import { GetDraftResponse } from '@/app/lib/draftTypes';
import { TOTAL_DRIVERS, PARTICIPANTS } from '@/app/lib/draftOrder';
import { drivers } from '@/app/static/drivers';
import DriverGrid from './DriverGrid';
import PicksSummary from './PicksSummary';
import SaveDraftButton from './SaveDraftButton';

export default function DraftClient() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [draftData, setDraftData] = useState<GetDraftResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingDriver, setPendingDriver] = useState<string | null>(null);
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

  // First click selects a driver (pending); second click on the same driver deselects it
  const handleSelect = (driverSlug: string) => {
    if (!selectedName || pickLoading) return;
    setPendingDriver(prev => prev === driverSlug ? null : driverSlug);
  };

  // Confirm button submits the pending pick to the API
  const handleConfirmPick = async () => {
    if (!selectedName || !pendingDriver || pickLoading) return;
    setPickLoading(true);
    try {
      const res = await fetch('/api/draft/pick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant: selectedName, driverSlug: pendingDriver }),
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
        setPendingDriver(null);
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
        setPendingDriver(null);
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
        <h1 className="text-3xl font-bold mb-10">F1 Draft 2026</h1>
        <div className="pt-8 pb-8 pr-10 pl-6">
          <h2 className="text-2xl font-bold mb-6">Who are you?</h2>
          <div className="flex flex-col gap-3">
            {PARTICIPANTS.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedName(name)}
                className="px-8 py-4 text-lg font-bold rounded-md bg-white text-black hover:bg-red-500 hover:text-white transition-colors text-center"
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
  const pendingDriverInfo = pendingDriver ? drivers[pendingDriver] : null;

  return (
    <main className="min-h-screen p-8 sm:p-24 sm:py-12 overflow-hidden pb-32">
      <h1 className="text-3xl font-bold mb-6">F1 Draft 2026</h1>

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
        onSelect={handleSelect}
        pendingDriver={pendingDriver}
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

      {/* Floating pick confirmation bar */}
      {pendingDriverInfo && isMyTurn && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 px-6 py-4 bg-black/95 backdrop-blur-sm border-t-2 border-red-500">
          {pendingDriverInfo.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pendingDriverInfo.image}
              alt=""
              className="h-14 w-auto object-contain pointer-events-none"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight">{pendingDriverInfo.name}</span>
            <span className="text-gray-400 text-xs capitalize">{pendingDriverInfo.team.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex gap-3 ml-4">
            <button
              onClick={handleConfirmPick}
              disabled={pickLoading}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {pickLoading ? 'Picking…' : 'Confirm Pick'}
            </button>
            <button
              onClick={() => setPendingDriver(null)}
              disabled={pickLoading}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
