export const revalidate = 60;
import { put, get } from '@vercel/blob';

import { allRaces } from "./static/races";
import { allResults, AllResults, FormattedRaceResult } from './static/raceResults';
import { drivers } from "./static/drivers";
import { getPointsByDriver } from "./utils/getPointsByDriver";
import { getPointsByPerson } from "./utils/getPointsByPerson";
import { getPointsByPersonPerRace } from "./utils/getPointsByPersonPerRace";
import { getPointsByDriverPerRace } from "./utils/getPointsByDriverPerRace";
import  DraftResults from './components/DraftResults';
import StandingsChart, { type LineConfig } from './components/StandingsChart';
import { formatRaceResults } from './utils/formatRaceResults';
import { checkForNewRace } from './utils/checkForNewRace';

const PERSON_COLORS: Record<string, string> = {
  Anton:    '#3b82f6',
  Anna:     '#f43f5e',
  Mike:     '#22c55e',
  Michelle: '#f59e0b',
  Swim:     '#a855f7',
};

// F1 2026 team colours; second driver per team gets a dashed line
const TEAM_COLORS: Record<string, string> = {
  alpine:           '#FF87BC',
  aston_martin:     '#229971',
  audi:             '#2363CC',
  cadillac:         '#B6BABD',
  ferrari:          '#E8002D',
  haas:             '#787878',
  mclaren:          '#FF8000',
  mercedes:         '#27F4D2',
  racing_bulls:     '#6692FF',
  red_bull_racing:  '#3671C6',
  williams:         '#64C4FF',
};

function buildDriversByPerson(orderedPeople: string[]): Record<string, LineConfig[]> {
  // Initialise keys in standings order so the dropdown follows the leaderboard
  const driversByPerson: Record<string, LineConfig[]> = {};
  orderedPeople.forEach((p) => { driversByPerson[p] = []; });

  Object.keys(drivers).forEach((id) => {
    const d = drivers[id];
    driversByPerson[d.pick]?.push({
      key:   d.name,
      color: TEAM_COLORS[d.team] ?? '#6b7280',
    });
  });

  return driversByPerson;
}

const RACE_RESULTS_BLOB_PATH = 'formula/formula.json';

async function getBlobResults(): Promise<AllResults | null> {
  try {
    const result = await get(RACE_RESULTS_BLOB_PATH, { access: 'private' });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function getRaceResults() {
  try {
    const currentResults = (await getBlobResults()) ?? allResults;

    if (checkForNewRace(currentResults)) {
      const newResult = await fetchApiResult();

      if (newResult) {
        await put(RACE_RESULTS_BLOB_PATH, JSON.stringify(newResult), {
          access: 'private',
          allowOverwrite: true,
          contentType: 'application/json',
        });
        return formatRaceResults(newResult);
      }
    }

    return formatRaceResults(currentResults);
  } catch (error) {
    console.log('error fetching results', error)
  }
  return formatRaceResults(allResults);
}

async function fetchApiResult(): Promise<AllResults|null> {
  console.log('fetching races');
  const res = await fetch('https://sdms.planetsport.com/api/motor/seasons/2026/results', { cache: 'no-cache' });

  if (!res.ok) {
    console.log('error fetching results', res);
    return null;
  }

  return res.json()
}


export default async function Home() {
  const raceResults: { results: FormattedRaceResult[] } = await getRaceResults();

  const driverStats = getPointsByDriver(raceResults.results);
  const pointsByPerson = getPointsByPerson(driverStats);
  const personStandingsData = getPointsByPersonPerRace(driverStats);
  const driverStandingsData = getPointsByDriverPerRace(driverStats);
  const peopleKeys = Object.keys(pointsByPerson).sort((a, b) => pointsByPerson[b].total - pointsByPerson[a].total);

  const personConfigs: LineConfig[] = peopleKeys.map((p) => ({
    key:   p,
    color: PERSON_COLORS[p] ?? '#6b7280',
  }));
  const driversByPerson = buildDriversByPerson(peopleKeys);

  return (
    <main className="min-h-screen p-8 sm:p-24 sm:py-12 overflow-hidden">
      <DraftResults peopleKeys={peopleKeys} driverStats={driverStats} pointsByPerson={pointsByPerson} />

      <h2 className="text-2xl mb-4 mt-8">Championship Standings</h2>
      <StandingsChart
        personData={personStandingsData}
        driverData={driverStandingsData}
        personConfigs={personConfigs}
        driversByPerson={driversByPerson}
      />

      <h2 className="text-2xl mb-2 mt-8">Race Results</h2>
      <section className="w-full h-[600px] overflow-scroll">
        <table className="w-full bg-white text-left whitespace-nowrap table-fixed p-2">
          <thead className="text-white w-full">
            <tr className="w-full mb-4">
              <th className="bg-black p-2 p-2 sticky left-0 top-0 z-20 w-[180px]">Driver</th>
              {allRaces.map((race) => (
                <th key={race.name} className="bg-black p-2 whitespace-nowrap sticky z-5 top-0 w-[130px]">
                  {race.name}
                  <br />
                  {race.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black">
            {Object.keys(driverStats).map((driver) => (
              <tr key={driver} className="rounded m-2">
                <th className="sticky left-0 w-[180px] p-2 z-10 bg-white">{driver}</th>
                {allRaces.map((race) => (
                  <td key={`${driver}-${race.name}`} className="p-2 w-[130px]">{driverStats[driver][race.name] || ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}