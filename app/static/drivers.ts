export type DriverInfo = {
  name: string;
  team: string;
  image: string;
  pick: string;
};

const BASE = 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000000/common/f1/2026';

export const drivers: Record<string, DriverInfo> = {
  'pierre-gasly': {
    name: 'Pierre Gasly',
    team: 'alpine',
    image: `${BASE}/alpine/piegas01/2026alpinepiegas01right.webp`,
    pick: 'Michelle',
  },
  'franco-colapinto': {
    name: 'Franco Colapinto',
    team: 'alpine',
    image: `${BASE}/alpine/fracol01/2026alpinefracol01right.webp`,
    pick: 'Swim',
  },
  'fernando-alonso': {
    name: 'Fernando Alonso',
    team: 'aston_martin',
    image: `${BASE}/astonmartin/feralo01/2026astonmartinferalo01right.webp`,
    pick: 'Anton',
  },
  'nico-hulkenberg': {
    name: 'Nico Hulkenberg',
    team: 'audi',
    image: `${BASE}/audi/nichul01/2026audinichul01right.webp`,
    pick: 'Anna',
  },
  'gabriel-bortoleto': {
    name: 'Gabriel Bortoleto',
    team: 'audi',
    image: `${BASE}/audi/gabbor01/2026audigabbor01right.webp`,
    pick: 'Anton',
  },
  'sergio-perez': {
    name: 'Sergio Perez',
    team: 'cadillac',
    image: `${BASE}/cadillac/serper01/2026cadillacserper01right.webp`,
    pick: 'Michelle',
  },
  'charles-leclerc': {
    name: 'Charles Leclerc',
    team: 'ferrari',
    image: `${BASE}/ferrari/chalec01/2026ferrarichalec01right.webp`,
    pick: 'Swim',
  },
  'lewis-hamilton': {
    name: 'Lewis Hamilton',
    team: 'ferrari',
    image: `${BASE}/ferrari/lewham01/2026ferrarilewham01right.webp`,
    pick: 'Michelle',
  },
  'esteban-ocon': {
    name: 'Esteban Ocon',
    team: 'haas',
    image: `${BASE}/haas/estoco01/2026haasestoco01right.webp`,
    pick: 'Michelle',
  },
  'oliver-bearman': {
    name: 'Oliver Bearman',
    team: 'haas',
    image: `${BASE}/haas/olibea01/2026haasolibea01right.webp`,
    pick: 'Anna',
  },
  'lando-norris': {
    name: 'Lando Norris',
    team: 'mclaren',
    image: `${BASE}/mclaren/lannor01/2026mclarenlannor01right.webp`,
    pick: 'Anna',
  },
  'oscar-piastri': {
    name: 'Oscar Piastri',
    team: 'mclaren',
    image: `${BASE}/mclaren/oscpia01/2026mclarenoscpia01right.webp`,
    pick: 'Mike',
  },
  'george-russell': {
    name: 'George Russell',
    team: 'mercedes',
    image: `${BASE}/mercedes/georus01/2026mercedesgeorus01right.webp`,
    pick: 'Anton',
  },
  'kimi-antonelli': {
    name: 'Kimi Antonelli',
    team: 'mercedes',
    image: `${BASE}/mercedes/andant01/2026mercedesandant01right.webp`,
    pick: 'Anna',
  },
  'liam-lawson': {
    name: 'Liam Lawson',
    team: 'racing_bulls',
    image: `${BASE}/racingbulls/lialaw01/2026racingbullslialaw01right.webp`,
    pick: 'Anton',
  },
  'arvid-lindblad': {
    name: 'Arvid Lindblad',
    team: 'racing_bulls',
    image: `${BASE}/racingbulls/arvlin01/2026racingbullsarvlin01right.webp`,
    pick: 'Swim',
  },
  'max-verstappen': {
    name: 'Max Verstappen',
    team: 'red_bull_racing',
    image: `${BASE}/redbullracing/maxver01/2026redbullracingmaxver01right.webp`,
    pick: 'Mike',
  },
  'isack-hadjar': {
    name: 'Isack Hadjar',
    team: 'red_bull_racing',
    image: `${BASE}/redbullracing/isahad01/2026redbullracingisahad01right.webp`,
    pick: 'Swim',
  },
  'carlos-sainz': {
    name: 'Carlos Sainz',
    team: 'williams',
    image: `${BASE}/williams/carsai01/2026williamscarsai01right.webp`,
    pick: 'Mike',
  },
  'alexander-albon': {
    name: 'Alexander Albon',
    team: 'williams',
    image: `${BASE}/williams/alealb01/2026williamsalealb01right.webp`,
    pick: 'Mike',
  },
};
