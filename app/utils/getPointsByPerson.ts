import { drivers } from '../static/drivers';
import { type DriverStats } from './getPointsByDriver';

type PersonStats = {
  [key: string]: number
}
export const getPointsByPerson = (allResults: DriverStats) => {
  const personStats: PersonStats = {};

  Object.keys(drivers).forEach((driverId) => {
    const currentDriver = drivers[driverId];
    const driverResults = allResults[currentDriver.name];

    // map over each race result
    Object.keys(driverResults).forEach((raceKey) => {
      if (Number(driverResults[raceKey])) {
       const points = Math.abs(Number(driverResults[raceKey]) - 21);

       if (!personStats[currentDriver.pick]) {
         personStats[currentDriver.pick] = 0;
       }

       personStats[currentDriver.pick] += points ;
      }
    });
  });

  return personStats;
}