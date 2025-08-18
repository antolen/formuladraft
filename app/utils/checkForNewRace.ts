

import { allRaces } from "../static/races";

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

  return false;
}