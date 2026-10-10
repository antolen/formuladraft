import { AllResults, Race } from "../static/raceResults";

// API race names that differ from the names in static/races.ts
const RACE_NAME_ALIASES: Record<string, string> = {
  'Netherlands Grand Prix': 'Dutch Grand Prix',
};

export const formatSingleResult = (race: Race) => {
  const driverResults = race.results.map((result) => ({
    position: result.pos,
    team: result.team,
    driver: {
      id: result.driver_slug,
      name: result.name,
    }
  }));

  return ({
    round: race.race_id,
    raceName: RACE_NAME_ALIASES[race.race_name] ?? race.race_name,
    circuit: {
      country: race.country,
      locality: race.race_name,
    },
    results: driverResults,
  })
}

export const formatRaceResults = (apiResults: AllResults) => {
  return apiResults.data.reduce((formattedData: { results: any[] }, race) => {
    const formattedResult = formatSingleResult(race);
    formattedData.results.push(formattedResult);

    return formattedData;
  }, { results: [] });
}