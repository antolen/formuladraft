
import { allRaces } from "./static/races";
import { resultOne, resultTwo, RaceResults } from './static/raceResults';
import { getPointsByDriver } from "./utils/getPointsByDriver";
import { getPointsByPerson } from "./utils/getPointsByPerson";


const getRaceLocation = (loc: { country: string; locality: string }) => {
  if (loc.country === 'USA' || loc.country === 'United States') {
    return loc.locality
  }

  return loc.country
}

export default function Home() {
  const racesCount = allRaces.MRData.RaceTable.Races.length;

  const allResults = [resultOne, resultTwo];
  const driverStats = getPointsByDriver(allResults);
  const pointsByPerson = getPointsByPerson(driverStats);
  const peopleKeys = Object.keys(pointsByPerson).sort((a, b) => pointsByPerson[b] - pointsByPerson[a]);

  return (
    <main className="min-h-screen p-8 sm:p-24 sm:py-12 overflow-hidden">
      <section className="mb-10 pt-2 pb-2 pr-2 border-red-500 border-t-8 border-r-8 border-b-8 rounded-r-2xl  ">
      <h1 className="text-3xl mb-2">Draft Results</h1>

      <ul>
        {peopleKeys.map((team, index) => (
          <li className="flex text-black bg-white my-1 py-5 px-4 rounded-md" key={team}>
            <span className="text-xs self-center font-bold mr-3">{index + 1}</span>
            <span className="text-lg bold font-bold flex-1">{team}</span>
            <span className="bg-gray-100 rounded-lg overflow-hidden py-1 px-3 text-sm">
              <span>{pointsByPerson[team]} PTS</span>
            </span>
          </li>
        ))}
      </ul>
      </section>

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
