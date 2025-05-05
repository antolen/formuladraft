

import { allRaces } from "../static/races";

export const checkForNewRace = (existingCount: number) => {
  const currentDate = new Date();
  const totalRaces = allRaces.length;
  let missingRace = null;

  const pastRaces = allRaces.reduce((raceNames: string[], race) => {
    if (new Date(race.match_date) < currentDate) {
      raceNames.push(race.name);
    }
    return raceNames;
  }, []);

  if (pastRaces.length > existingCount && totalRaces > existingCount) {
    missingRace = allRaces[existingCount].name;
  }

  return !!missingRace;
}