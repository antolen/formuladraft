import { FormattedRaceResult, RaceResults } from "../static/raceResults";

export const formatSingleResult = (race: RaceResults) => {
  const driverResults = race.MRData.RaceTable.Races[0].Results.map((result) => ({
    position: result.positionText,
    team: result.Constructor.constructorId,
    driver: {
      id: result.Driver.driverId,
      name: result.Driver.givenName + ' ' + result.Driver.familyName,
    }
  }));

  return ({
    round: race.MRData.RaceTable.round,
    raceName: race.MRData.RaceTable.Races[0].raceName,
    circuit: {
      country: race.MRData.RaceTable.Races[0].Circuit.Location.country,
      locality: race.MRData.RaceTable.Races[0].Circuit.Location.locality
    },
    results: driverResults,
  })
}
export const formatRaceResults = (apiResults: RaceResults[]) => {
  return apiResults.reduce((formattedData: { results: FormattedRaceResult[] },race) => {
    const formattedResult = formatSingleResult(race);
    formattedData.results.push(formattedResult);

    return formattedData;
  }, { results: [] });
}