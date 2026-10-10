
import { type FormattedRaceResult, type FormattedDriverResult, type Result } from '../static/raceResults';
import { drivers } from '../static/drivers';

export type DriverStats = {
  [key: string]: {
    [key: string]: string;
  }
}

// Stand-in driver slug -> drafted driver slug whose points they score.
// Only applied in races where the drafted driver has no result of their own.
const SUBSTITUTES: Record<string, string> = {
  'yuki-tsunoda': 'isack-hadjar',
};

const matchReplacementsToDriver = (raceName: string, replacements: FormattedDriverResult[], driverStats: DriverStats) => {
  replacements.forEach((replacement) => {
    const replacedId = SUBSTITUTES[replacement.driver.id];
    if (!replacedId || !drivers[replacedId]) return;

    const replacedDriver = drivers[replacedId].name;
    if (driverStats[replacedDriver]?.[raceName]) return;

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