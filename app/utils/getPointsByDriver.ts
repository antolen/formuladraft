
import { type RaceResults, type Result } from '../static/raceResults';
import { drivers } from '../static/drivers';

export type DriverStats = {
  [key: string]: {
    [key: string]: string;
  }
}

const matchReplacementsToDriver = (raceName: string, replacements: Result[], driverStats: DriverStats) => {
  replacements.forEach((replacement) => {
    const replacementTeam = replacement.Constructor.constructorId;

    const teamDrivers = {} as {
      [key: string]: string[]
    };

    Object.keys(drivers).forEach((driverId) => {
      const driver = drivers[driverId];

      if (!teamDrivers[driver.team]) {
        teamDrivers[driver.team] = [driver.name]
      } else {
        teamDrivers[driver.team].push(driver.name)
      }
    });

    const driversOnTeam = teamDrivers[replacementTeam];

    const replacedDriver = driverStats[driversOnTeam[0]] ? driversOnTeam[1] : driversOnTeam[0];

    driverStats[replacedDriver] = {
      ...driverStats[replacedDriver],
      [raceName]: replacement.positionText,
    }

  })
}

export const getPointsByDriver = (allResults: RaceResults[]) => {
  const driverStats: DriverStats = {};

  allResults.forEach(race => {
    const raceName = race.MRData.RaceTable.Races[0].raceName;
    const replacements: Result[] = [];
    race.MRData.RaceTable.Races[0].Results.forEach((result) => {

      const driverId = result.Driver.driverId;
      const driver = result.Driver.givenName + ' ' + result.Driver.familyName;

      if (!drivers[driverId]) {
        replacements.push(result);
      } else {
        if (!driverStats[driver]) {
          driverStats[driver] = {};
        }

        driverStats[driver] = {
          ...driverStats[driver],
          [raceName]: result.positionText
        };
      }
    });

    if (replacements.length > 0) {
      matchReplacementsToDriver(raceName, replacements, driverStats);
    }
  });

  return driverStats;
}