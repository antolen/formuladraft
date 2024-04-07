import { kv } from '@vercel/kv';

import { allRaces } from "./static/races";
import { resultOne, resultTwo, resultThree, RaceResults, FormattedRaceResult } from './static/raceResults';
import { getPointsByDriver } from "./utils/getPointsByDriver";
import { getPointsByPerson } from "./utils/getPointsByPerson";
import  DraftResults from './components/DraftResults';
import { formatRaceResults, formatSingleResult } from './utils/formatRaceResults';
import { checkForNewRace } from './utils/checkForNewRace';

const fillResults = async () => {
  const allResults: RaceResults[] = [resultOne, resultTwo, resultThree];
  const formatted = formatRaceResults(allResults);

  await kv.set('formula',  formatted );
  return formatted;
}


async function getRaceResults() {
  try {
    const formulaResults: { results: FormattedRaceResult[] } | null = await kv.get('formula');

    if (!formulaResults) {
      console.log('MISSING DATA');
    } else {
      // @ts-ignore
      if (checkForNewRace(formulaResults.results.length)) {
        const newResult = await fetchApiResult(formulaResults?.results?.length);
        if (newResult) {
          const newFormattedResult = formatSingleResult(newResult);
          formulaResults.results.push(newFormattedResult);
          await kv.set('formula', newFormattedResult);
        }
      }

      return formulaResults as { results: FormattedRaceResult[] };
    }
  } catch (error) {
    console.log('error fetching results', error)
  }

  const allResults: RaceResults[] = [resultOne, resultTwo, resultThree];
  return formatRaceResults(allResults);
}

const getRaceLocation = (loc: { country: string; locality: string }) => {
  if (loc.country === 'USA' || loc.country === 'United States') {
    return loc.locality
  }

  return loc.country
}

async function fetchApiResult(id: number): Promise<RaceResults|null> {
  const res = await fetch(`https://ergast.com/api/f1/2024/${id}/results.json`);

  if (!res.ok) {
    console.log('error fetching results', res);
    return null;
  }

  return res.json()
}


export default async function Home() {
  const racesCount = allRaces.MRData.RaceTable.Races.length;
  const raceResults: { results: FormattedRaceResult[] } = await getRaceResults();

  const driverStats = getPointsByDriver(raceResults.results);
  const pointsByPerson = getPointsByPerson(driverStats);
  const peopleKeys = Object.keys(pointsByPerson).sort((a, b) => pointsByPerson[b].total - pointsByPerson[a].total);


  return (
    <main className="min-h-screen p-8 sm:p-24 sm:py-12 overflow-hidden">
      <DraftResults peopleKeys={peopleKeys} driverStats={driverStats} pointsByPerson={pointsByPerson} />

      <h2 className="text-2xl mb-2">Race Results</h2>
      <section className="w-full h-[600px] overflow-scroll">
        <table className="w-full bg-white text-left whitespace-nowrap table-fixed p-2">
          <thead className="text-white w-full">
            <tr className="w-full mb-4">
              <th className="bg-black p-2 p-2 sticky left-0 top-0 z-20 w-[180px]">Driver</th>
              {allRaces.MRData.RaceTable.Races.map((race) => (
                <th key={race.raceName} className="bg-black p-2 whitespace-nowrap sticky z-5 top-0 w-[130px]">
                  {getRaceLocation(race.Circuit.Location)}
                  <br />
                  {new Date(race.date.split('-').join(',')).toDateString().replace('2024', '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black">
            {Object.keys(driverStats).map((driver) => (
              <tr key={driver} className="rounded m-2">
                <th className="sticky left-0 w-[180px] p-2 z-10 bg-white">{driver}</th>
                {Object.keys(driverStats[driver]).map((points) => (
                  <td key={`${driver}-${points}`} className="p-2 w-[130px]">{driverStats[driver][points]}</td>
                ))}
                {racesCount > Object.keys(driverStats[driver]).length ? (
                  Array.from({ length: racesCount - Object.keys(driverStats[driver]).length }).map((_val, index) => (
                    <td key={index} className="w-[190px]"></td>
                  ))
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

