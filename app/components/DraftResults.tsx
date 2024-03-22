"use client"
import { useState } from 'react';

const ExpandedIcon = () => (
  <div className="w-0 h-0 mt-2 ml-2 
    border-l-[7px] border-l-transparent
    border-t-[10px] border-t-red-500
    border-r-[7px] border-r-transparent">
</div>
);

const ClosedIcon = () => (
  <div className="w-0 h-0 mt-2 ml-2
  border-t-[7px] border-t-transparent
  border-l-[10px] border-l-red-500
  border-b-[7px] border-b-transparent">
</div>
)
const DriverResults = ({ peopleKeys, pointsByPerson }: any ) => {
  const [currentExpandedTeam, updateCurrentExpandedTeam] = useState('');

  const toggleExpanded = (team: string) => {
    if (currentExpandedTeam === team) {
      updateCurrentExpandedTeam('');
    } else {
      updateCurrentExpandedTeam(team);
    }
  }

  return (
    <section className="mb-10 pt-2 pb-2 pr-2 border-red-500 border-t-8 border-r-8 border-b-8 rounded-r-2xl">
    <h1 className="text-3xl mb-2">Draft Results</h1>

    <ul>
      {peopleKeys.map((team: any, index: number) => (
        <li className="flex flex-wrap text-black bg-white my-1 py-5 px-4 rounded-md" key={team} onClick={() => toggleExpanded(team)}>
          <span className="text-xs self-center font-bold mr-3">{index + 1}</span>
          <span className="text-lg bold font-bold flex-1">{team}</span>
          <span className="bg-gray-100 rounded-lg overflow-hidden py-1 px-3 text-sm">
            <span>{pointsByPerson[team].total} PTS</span>
          </span>
          {currentExpandedTeam === team ? <ExpandedIcon /> : <ClosedIcon />}
            {currentExpandedTeam === team ? (
              <ul className="w-full">
                {Object.keys(pointsByPerson[team].driverScores).map((driver) => (
                  <li className="py-1 px-4" key={driver}>
                    <span className="text-xs self-center font-bold mr-3">{driver}: {pointsByPerson[team].driverScores[driver]}</span>
                  </li>
                ))}
              </ul>
            ) : null }
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DriverResults;