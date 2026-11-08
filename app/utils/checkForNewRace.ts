

import { allRaces } from "../static/races";

const RESULTS_SETTLE_MS = 48 * 60 * 60 * 1000;

export const checkForNewRace = (allRaceResults: any) => {
  const currentDate = new Date();
  const existingCount = Array.isArray(allRaceResults?.data) ? allRaceResults.data.length : 0;
  const totalRaces = allRaces.length;

  const pastRaces = allRaces.reduce((raceNames: string[], race) => {
    if (new Date(race.match_date) < currentDate) {
      raceNames.push(race.name);
    }
    return raceNames;
  }, []);

  if (pastRaces.length > existingCount && totalRaces > existingCount) {
    return true
  }

  // Keep refreshing for a while after the latest race ends, so results saved
  // mid-race or before penalties are applied get corrected
  const latestEnd = Math.max(0, ...(allRaceResults?.data ?? []).map((race: any) => new Date(race.end_date).getTime() || 0));
  if (currentDate.getTime() - latestEnd < RESULTS_SETTLE_MS) {
    return true;
  }

  return false;
}