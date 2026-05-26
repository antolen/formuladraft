'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { type RaceStandingsPoint } from '../utils/getPointsByPersonPerRace';

export type LineConfig = {
  key: string;
  color: string;
  strokeDasharray?: string;
};

type Mode = 'person' | 'driver';

type Props = {
  personData: RaceStandingsPoint[];
  driverData: RaceStandingsPoint[];
  personConfigs: LineConfig[];
  driversByPerson: Record<string, LineConfig[]>;
};

export default function StandingsChart({ personData, driverData, personConfigs, driversByPerson }: Props) {
  const people = Object.keys(driversByPerson);

  const [mode, setMode] = useState<Mode>('person');
  const [selectedPerson, setSelectedPerson] = useState<string>(people[0] ?? '');

  const data = mode === 'person' ? personData : driverData;
  const configs = mode === 'person' ? personConfigs : (driversByPerson[selectedPerson] ?? []);

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Controls row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => setMode('person')}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === 'person'
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            By User
          </button>
          <button
            onClick={() => setMode('driver')}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === 'driver'
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            By Driver
          </button>
        </div>

        {mode === 'driver' && (
          <select
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
          >
            {people.map((person) => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        )}
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[400px] text-gray-400">
          No race data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="race"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 11 }}
              height={90}
            />
            <YAxis
              label={{ value: 'Points', angle: -90, position: 'insideLeft', offset: 10 }}
              allowDecimals={false}
            />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 12 }} />
            {configs.map((config) => (
              <Line
                key={config.key}
                type="monotone"
                dataKey={config.key}
                stroke={config.color}
                strokeWidth={2.5}
                strokeDasharray={config.strokeDasharray}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
