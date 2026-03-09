export type AllResults = {
  data: Race[];
}

export type Race = {
  race_id: number;
  race_name: string;
  venue_name: string;
  match_date: string;
  start_date: string;
  end_date: string;
  country: string;
  country_code: string;
  sessions: string[];
  results: Result[];
};

export type Result = {
  gap: string;
  pos: string;
  laps: string;
  name: string;
  pits: string;
  team: string;
  time: string;
  point: number;
  country: string;
  team_slug: string;
  driver_slug: string;
};

export type FormattedRaceResult = {
  round: string;
  raceName: string;
  results: FormattedDriverResult[]
  circuit: {
    country: string;
    locality: string
  }
};
  
export type FormattedDriverResult = {
  position: string;
  driver: {
    id: string;
    name: string;
  };
  team: string;
}

const allResults: AllResults = {
  "data":[{"race_id":1151,"race_name":"Australian Grand Prix","venue_name":"Albert Park Circuit","match_date":"2026-03-08","start_date":"2026-03-06T01:30:00Z","end_date":"2026-03-08T06:00:00Z","country":"Australia","country_code":"AUS","sessions":["Practice 1","Practice 2","Practice 3","Qualifying 1","Qualifying 2","Qualifying 3","Grid","Race","FastestLap"],"results":[{"gap":"1:23:06.801","pos":"1","laps":"58","name":"George Russell","pits":"1","team":"Mercedes","time":"1:23:06.801","point":25,"country":"Great Britain","team_slug":"mercedes","driver_slug":"george-russell"},{"gap":"2.974","pos":"2","laps":"58","name":"Kimi Antonelli","pits":"1","team":"Mercedes","time":"+2.974s","point":18,"country":"Italy","team_slug":"mercedes","driver_slug":"kimi-antonelli"},{"gap":"15.519","pos":"3","laps":"58","name":"Charles Leclerc","pits":"1","team":"Ferrari","time":"+15.519s","point":15,"country":"Monaco","team_slug":"ferrari","driver_slug":"charles-leclerc"},{"gap":"16.144","pos":"4","laps":"58","name":"Lewis Hamilton","pits":"1","team":"Ferrari","time":"+16.144s","point":12,"country":"Great Britain","team_slug":"ferrari","driver_slug":"lewis-hamilton"},{"gap":"51.741","pos":"5","laps":"58","name":"Lando Norris","pits":"2","team":"McLaren","time":"+51.741s","point":10,"country":"Great Britain","team_slug":"mclaren","driver_slug":"lando-norris"},{"gap":"54.617","pos":"6","laps":"58","name":"Max Verstappen","pits":"2","team":"Red Bull","time":"+54.617s","point":8,"country":"Netherlands","team_slug":"red-bull","driver_slug":"max-verstappen"},{"gap":"1 LAP","pos":"7","laps":"57","name":"Oliver Bearman","pits":"1","team":"Haas","time":"1 LAP","point":6,"country":"Great Britain","team_slug":"haas","driver_slug":"oliver-bearman"},{"gap":"1 LAP","pos":"8","laps":"57","name":"Arvid Lindblad","pits":"1","team":"Racing Bulls","time":"1 LAP","point":4,"country":"Great Britain","team_slug":"racing-bulls","driver_slug":"arvid-lindblad"},{"gap":"1 LAP","pos":"9","laps":"57","name":"Gabriel Bortoleto","pits":"2","team":"Audi","time":"1 LAP","point":2,"country":"Brazil","team_slug":"audi","driver_slug":"gabriel-bortoleto"},{"gap":"1 LAP","pos":"10","laps":"57","name":"Pierre Gasly","pits":"1","team":"Alpine","time":"1 LAP","point":1,"country":"France","team_slug":"alpine","driver_slug":"pierre-gasly"},{"gap":"1 LAP","pos":"11","laps":"57","name":"Esteban Ocon","pits":"1","team":"Haas","time":"1 LAP","point":0,"country":"France","team_slug":"haas","driver_slug":"esteban-ocon"},{"gap":"1 LAP","pos":"12","laps":"57","name":"Alexander Albon","pits":"2","team":"Williams","time":"1 LAP","point":0,"country":"Thailand","team_slug":"williams","driver_slug":"alex-albon"},{"gap":"1 LAP","pos":"13","laps":"57","name":"Liam Lawson","pits":"2","team":"Racing Bulls","time":"1 LAP","point":0,"country":"New Zealand","team_slug":"racing-bulls","driver_slug":"liam-lawson"},{"gap":"2 LAPS","pos":"14","laps":"56","name":"Franco Colapinto","pits":"2","team":"Alpine","time":"2 LAPS","point":0,"country":"Argentina","team_slug":"alpine","driver_slug":"franco-colapinto"},{"gap":"2 LAPS","pos":"15","laps":"56","name":"Carlos Sainz","pits":"3","team":"Williams","time":"2 LAPS","point":0,"country":"Spain","team_slug":"williams","driver_slug":"carlos-sainz"},{"gap":"3 LAPS","pos":"16","laps":"55","name":"Sergio Perez","pits":"2","team":"Cadillac","time":"3 LAPS","point":0,"country":"Mexico","team_slug":"cadillac","driver_slug":"sergio-perez"},{"gap":"15 LAPS","pos":"17","laps":"43","name":"Lance Stroll","pits":"4","team":"Aston Martin","time":"15 LAPS","point":0,"country":"Canada","team_slug":"aston-martin","driver_slug":"lance-stroll"},{"gap":"37 LAPS","pos":"R","laps":"21","name":"Fernando Alonso","pits":"3","team":"Aston Martin","time":"37 LAPS","point":0,"country":"Spain","team_slug":"aston-martin","driver_slug":"fernando-alonso"},{"gap":"43 LAPS","pos":"R","laps":"15","name":"Valtteri Bottas","pits":"1","team":"Cadillac","time":"43 LAPS","point":0,"country":"Finland","team_slug":"cadillac","driver_slug":"valtteri-bottas"},{"gap":"48 LAPS","pos":"R","laps":"10","name":"Isack Hadjar","pits":"0","team":"Red Bull","time":"48 LAPS","point":0,"country":"France","team_slug":"red-bull","driver_slug":"isack-hadjar"},{"gap":"","pos":"R","laps":"0","name":"Oscar Piastri","pits":"0","team":"McLaren","time":"","point":0,"country":"Australia","team_slug":"mclaren","driver_slug":"oscar-piastri"},{"gap":"","pos":"R","laps":"0","name":"Nico Hulkenberg","pits":"0","team":"Audi","time":"","point":0,"country":"Germany","team_slug":"audi","driver_slug":"nico-hulkenberg"}]}]}
  ;

export { allResults };