export type DriverInfo = {
  name: string;
  team: string;
  image: string;
  pick?: string;
};

const BASE = 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000000/common/f1/2026';

export const drivers: Record<string, DriverInfo> = {
  'pierre-gasly': {
    name: 'Pierre Gasly',
    team: 'alpine',
    image: `${BASE}/alpine/piegas01/2026alpinepiegas01right.webp`,
  },
  'franco-colapinto': {
    name: 'Franco Colapinto',
    team: 'alpine',
    image: `${BASE}/alpine/fracol01/2026alpinefracol01right.webp`,
  },
  'fernando-alonso': {
    name: 'Fernando Alonso',
    team: 'aston_martin',
    image: `${BASE}/astonmartin/feralo01/2026astonmartinferalo01right.webp`,
  },
  'lance-stroll': {
    name: 'Lance Stroll',
    team: 'aston_martin',
    image: `${BASE}/astonmartin/lanstr01/2026astonmartinlanstr01right.webp`,
  },
  'nico-hulkenberg': {
    name: 'Nico Hulkenberg',
    team: 'audi',
    image: `${BASE}/audi/nichul01/2026audinichul01right.webp`,
  },
  'gabriel-bortoleto': {
    name: 'Gabriel Bortoleto',
    team: 'audi',
    image: `${BASE}/audi/gabbor01/2026audigabbor01right.webp`,
  },
  'sergio-perez': {
    name: 'Sergio Perez',
    team: 'cadillac',
    image: `${BASE}/cadillac/serper01/2026cadillacserper01right.webp`,
  },
  'valtteri-bottas': {
    name: 'Valtteri Bottas',
    team: 'cadillac',
    image: `${BASE}/cadillac/valbot01/2026cadillacvalbot01right.webp`,
  },
  'charles-leclerc': {
    name: 'Charles Leclerc',
    team: 'ferrari',
    image: `${BASE}/ferrari/chalec01/2026ferrarichalec01right.webp`,
  },
  'lewis-hamilton': {
    name: 'Lewis Hamilton',
    team: 'ferrari',
    image: `${BASE}/ferrari/lewham01/2026ferrarilewham01right.webp`,
  },
  'esteban-ocon': {
    name: 'Esteban Ocon',
    team: 'haas',
    image: `${BASE}/haas/estoco01/2026haasestoco01right.webp`,
  },
  'oliver-bearman': {
    name: 'Oliver Bearman',
    team: 'haas',
    image: `${BASE}/haas/olibea01/2026haasolibea01right.webp`,
  },
  'lando-norris': {
    name: 'Lando Norris',
    team: 'mclaren',
    image: `${BASE}/mclaren/lannor01/2026mclarenlannor01right.webp`,
  },
  'oscar-piastri': {
    name: 'Oscar Piastri',
    team: 'mclaren',
    image: `${BASE}/mclaren/oscpia01/2026mclarenoscpia01right.webp`,
  },
  'george-russell': {
    name: 'George Russell',
    team: 'mercedes',
    image: `${BASE}/mercedes/georus01/2026mercedesgeorus01right.webp`,
  },
  'kimi-antonelli': {
    name: 'Kimi Antonelli',
    team: 'mercedes',
    image: `${BASE}/mercedes/andant01/2026mercedesandant01right.webp`,
  },
  'liam-lawson': {
    name: 'Liam Lawson',
    team: 'racing_bulls',
    image: `${BASE}/racingbulls/lialaw01/2026racingbullslialaw01right.webp`,
  },
  'arvid-lindblad': {
    name: 'Arvid Lindblad',
    team: 'racing_bulls',
    image: `${BASE}/racingbulls/arvlin01/2026racingbullsarvlin01right.webp`,
  },
  'max-verstappen': {
    name: 'Max Verstappen',
    team: 'red_bull_racing',
    image: `${BASE}/redbullracing/maxver01/2026redbullracingmaxver01right.webp`,
  },
  'isack-hadjar': {
    name: 'Isack Hadjar',
    team: 'red_bull_racing',
    image: `${BASE}/redbullracing/isahad01/2026redbullracingisahad01right.webp`,
  },
  'carlos-sainz': {
    name: 'Carlos Sainz',
    team: 'williams',
    image: `${BASE}/williams/carsai01/2026williamscarsai01right.webp`,
  },
  'alexander-albon': {
    name: 'Alexander Albon',
    team: 'williams',
    image: `${BASE}/williams/alealb01/2026williamsalealb01right.webp`,
  },
};
