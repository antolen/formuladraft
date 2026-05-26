import { drivers } from '../static/drivers';
import { allRaces } from '../static/races';
import { type DriverStats } from './getPointsByDriver';
import { type RaceStandingsPoint } from './getPointsByPersonPerRace';

const RACE_NAME_MAP: Record<string, string> = {
  'Australian':          'Australia',
  'Chinese':             'China',
  'Japanese':            'Japan',
  'Canadian':            'Canada',
  'Barcelona-Catalunya': 'Catalunya',
  'Austrian':            'Austria',
  'British':             'Britain',
  'Belgian':             'Belgium',
  'Hungarian':           'Hungary',
  'Dutch':               'Netherlands',
  'Italian':             'Italy',
  'Spanish':             'Spain',
  'United States':       'USA',
};

function formatRaceName(fullName: string): string {
  const stripped = fullName.replace(' Grand Prix', '');
  return RACE_NAME_MAP[stripped] ?? stripped;
}

export function getPointsByDriverPerRace(driverStats: DriverStats): RaceStandingsPoint[] {
  const perRacePoints: Record<string, Record<string, number>> = {};

  // Only include drafted drivers
  Object.keys(drivers).forEach((driverId) => {
    const driver = drivers[driverId];
    const driverResults = driverStats[driver.name];
    if (!driverResults) return;

    Object.keys(driverResults).forEach((raceName) => {
      const pos = driverResults[raceName];
      if (!Number(pos)) return;
      const points = Math.abs(Number(pos) - 21); // same scoring as getPointsByPerson

      if (!perRacePoints[raceName]) perRacePoints[raceName] = {};
      perRacePoints[raceName][driver.name] =
        (perRacePoints[raceName][driver.name] ?? 0) + points;
    });
  });

  const cumulativeScores: Record<string, number> = {};
  const chartData: RaceStandingsPoint[] = [];

  allRaces.forEach((race) => {
    const racePoints = perRacePoints[race.name];
    if (!racePoints) return;

    Object.keys(racePoints).forEach((name) => {
      cumulativeScores[name] = (cumulativeScores[name] ?? 0) + racePoints[name];
    });

    chartData.push({
      race: formatRaceName(race.name),
      ...Object.fromEntries(Object.entries(cumulativeScores)),
    });
  });

  return chartData;
}
