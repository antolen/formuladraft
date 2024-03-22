
import { allRaces } from "./static/races";
import { resultOne, resultTwo, RaceResults } from './static/raceResults';
import { getPointsByDriver } from "./utils/getPointsByDriver";
import { getPointsByPerson } from "./utils/getPointsByPerson";
import  DraftResults from './components/DraftResults';

const getRaceLocation = (loc: { country: string; locality: string }) => {
  if (loc.country === 'USA' || loc.country === 'United States') {
    return loc.locality
  }

  return loc.country
}

async function getData(): Promise<RaceResults|null> {
  const res = await fetch('http://ergast.com/api/f1/current/last/results.json');

  if (!res.ok) {
    return null;
  }

  return res.json()
}
export default async function Home() {
  const racesCount = allRaces.MRData.RaceTable.Races.length;
  const latestRaceResults = await getData();

  const allResults: RaceResults[] = [resultOne, resultTwo];

  if (latestRaceResults && latestRaceResults?.MRData?.RaceTable?.round !== resultTwo.MRData.RaceTable.round) {
    allResults.push(latestRaceResults);
  }

  const driverStats = getPointsByDriver(allResults);
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

