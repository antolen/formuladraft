import { AllResults, Race } from "../static/raceResults";

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
    raceName: race.race_name,
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