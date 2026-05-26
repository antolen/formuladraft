import { drivers } from '../static/drivers';
import { allRaces } from '../static/races';
import { type DriverStats } from './getPointsByDriver';

const RACE_NAME_MAP: Record<string, string> = {
  'Australian':        'Australia',
  'Chinese':           'China',
  'Japanese':          'Japan',
  'Canadian':          'Canada',
  'Barcelona-Catalunya': 'Catalunya',
  'Austrian':          'Austria',
  'British':           'Britain',
  'Belgian':           'Belgium',
  'Hungarian':         'Hungary',
  'Dutch':             'Netherlands',
  'Italian':           'Italy',
  'Spanish':           'Spain',
  'United States':     'USA',
};

function formatRaceName(fullName: string): string {
  const stripped = fullName.replace(' Grand Prix', '');
  return RACE_NAME_MAP[stripped] ?? stripped;
}

export type RaceStandingsPoint = {
  race: string;
  [person: string]: number | string;
};

export function getPointsByPersonPerRace(driverStats: DriverStats): RaceStandingsPoint[] {
  // Tally each person's points earned in each individual race
  const perRacePoints: Record<string, Record<string, number>> = {};

  Object.keys(drivers).forEach((driverId) => {
    const driver = drivers[driverId];
    if (!driver.pick) return;
    const driverResults = driverStats[driver.name];
    if (!driverResults) return;

    Object.keys(driverResults).forEach((raceName) => {
      const pos = driverResults[raceName];
      if (!Number(pos)) return; // skip DNFs / non-numeric positions
      const points = Math.abs(Number(pos) - 21); // same scoring as getPointsByPerson

      if (!perRacePoints[raceName]) perRacePoints[raceName] = {};
      perRacePoints[raceName][driver.pick] = (perRacePoints[raceName][driver.pick] ?? 0) + points;
    });
  });

  // Walk through races in calendar order and build cumulative totals
  const cumulativeScores: Record<string, number> = {};
  const chartData: RaceStandingsPoint[] = [];

  allRaces.forEach((race) => {
    const racePoints = perRacePoints[race.name];
    if (!racePoints) return; // race hasn't happened yet

    Object.keys(racePoints).forEach((person) => {
      cumulativeScores[person] = (cumulativeScores[person] ?? 0) + racePoints[person];
    });

    chartData.push({
      race: formatRaceName(race.name),
      // spread a copy so later mutations to cumulativeScores don't affect this entry
      ...Object.fromEntries(Object.entries(cumulativeScores)),
    });
  });

  return chartData;
}
