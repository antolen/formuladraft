

import { allRaces } from "../static/races";
export const checkForNewRace = (existingCount: number) => {
  const currentDate = new Date();
  const totalRaces = allRaces.MRData.RaceTable.Races.length;
  let missingRace = null;

  const pastRaces = allRaces.MRData.RaceTable.Races.reduce((raceNames: string[], race) => {
    if (new Date(race.date + ' ' + race.time) < currentDate) {
      raceNames.push(race.raceName);
    }
    return raceNames;
  }, []);

  if (pastRaces.length > existingCount && totalRaces > existingCount) {
    missingRace = allRaces.MRData.RaceTable.Races[existingCount].raceName;
  }

  return !!missingRace;
}