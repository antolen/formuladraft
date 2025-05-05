import { drivers } from '../static/drivers';
import { type DriverStats } from './getPointsByDriver';

type PersonStats = {
  [key: string]: {
    total: number;
    driverScores: {
      [key: string]: number
    }
  }
}
export const getPointsByPerson = (allResults: DriverStats) => {
  const personStats: PersonStats = {};

  Object.keys(drivers).forEach((driverId) => {
    const currentDriver = drivers[driverId];
    const driverResults = allResults[currentDriver.name];

    // map over each race result
    if (driverResults) {
      Object.keys(driverResults).forEach((raceKey) => {
        if (Number(driverResults[raceKey])) {
        const points = Math.abs(Number(driverResults[raceKey]) - 21);

        if (!personStats[currentDriver.pick]) {
          personStats[currentDriver.pick] = {
            total: 0,
            driverScores: {}
          };
        }

        // Add points per driver too
        personStats[currentDriver.pick].total += points;
        if (!personStats[currentDriver.pick].driverScores[currentDriver.name]) {
          personStats[currentDriver.pick].driverScores[currentDriver.name] = points;
        } else {
          personStats[currentDriver.pick].driverScores[currentDriver.name] += points;
        }
        }
      });
    }
  });

  return personStats;
}