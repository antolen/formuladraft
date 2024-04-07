
import { type FormattedRaceResult, type FormattedDriverResult, type Result } from '../static/raceResults';
import { drivers } from '../static/drivers';

export type DriverStats = {
  [key: string]: {
    [key: string]: string;
  }
}

const matchReplacementsToDriver = (raceName: string, replacements: FormattedDriverResult[], driverStats: DriverStats) => {
  replacements.forEach((replacement) => {
    const replacementTeam = replacement.team;

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
      [raceName]: replacement.position,
    }

  })
}

export const getPointsByDriver = (allResults: FormattedRaceResult[]) => {
  const driverStats: DriverStats = {};

  allResults.forEach(race => {
    const raceName = race.raceName;
    const replacements: FormattedDriverResult[] = [];
    race.results.forEach((result) => {

      const driverId = result.driver.id;
      const driver = result.driver.name;

      if (!drivers[driverId]) {
        replacements.push(result);
      } else {
        if (!driverStats[driver]) {
          driverStats[driver] = {};
        }

        driverStats[driver] = {
          ...driverStats[driver],
          [raceName]: result.position
        };
      }
    });

    if (replacements.length > 0) {
      matchReplacementsToDriver(raceName, replacements, driverStats);
    }
  });

  return driverStats;
}