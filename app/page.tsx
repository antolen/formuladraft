export const revalidate = 60;

import { kv } from '@vercel/kv';

import { allRaces } from "./static/races";
import { allResults, AllResults, FormattedRaceResult } from './static/raceResults';
import { getPointsByDriver } from "./utils/getPointsByDriver";
import { getPointsByPerson } from "./utils/getPointsByPerson";
import  DraftResults from './components/DraftResults';
import { formatRaceResults, formatSingleResult } from './utils/formatRaceResults';
import { checkForNewRace } from './utils/checkForNewRace';


async function getRaceResults() {
  /*
  try {
    const formulaResults: { results: FormattedRaceResult[] } | null = await kv.get('formula');

    if (!formulaResults) {
      console.log('MISSING DATA');
    } else {
      // @ts-ignore
      if (checkForNewRace(formulaResults.results.length)) {
        const newResult = await fetchApiResult(formulaResults?.results?.length + 1);
        if (newResult) {
          const newFormattedResult = formatSingleResult(newResult);
          formulaResults.results.push(newFormattedResult);
          await kv.set('formula', formulaResults);
        }
      }

      return formulaResults as { results: FormattedRaceResult[] };
    }
  } catch (error) {
    console.log('error fetching results', error)
  }
  */

  return formatRaceResults(allResults);
}

async function fetchApiResult(id: number): Promise<AllResults|null> {
  const res = await fetch(`https://sports-api.prod.ps-aws.com/api/motor/seasons/2025/results`);

  if (!res.ok) {
    console.log('error fetching results', res);
    return null;
  }

  return res.json()
}


export default async function Home() {
  const racesCount = allRaces.length;
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

