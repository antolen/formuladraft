import { AllResults, Race } from "../static/raceResults";
import { allRaces } from "../static/races";

// The API's race names don't always match static/races.ts (e.g. "Mexican" vs
// "Mexico City"), so use the calendar name for the matching race id
const getCalendarRaceName = (race: Race) =>
  allRaces.find((calendarRace) => calendarRace.id === race.race_id)?.name ?? race.race_name;

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
    raceName: getCalendarRaceName(race),
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