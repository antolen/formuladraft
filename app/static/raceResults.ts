export type RaceResults = {
  MRData: {
    RaceTable: {
      round: string;
      Races: {
        raceName: string;
        Circuit: {
          Location: {
            country: string;
            locality: string;
          }
        }
        Results: Result[]
      }[]
    }
  }
}

export type Result = {
  Driver: {
    driverId: string;
    givenName: string;
    familyName: string;
  }
  positionText: string;
  Constructor: {
    constructorId: string;
  }
}

export const resultOne = {"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.5","series":"f1","url":"http://ergast.com/api/f1/2024/1/results.json","limit":"30","offset":"0","total":"20","RaceTable":{"season":"2024","round":"1","Races":[{"season":"2024","round":"1","url":"https:\/\/en.wikipedia.org\/wiki\/2024_Bahrain_Grand_Prix","raceName":"Bahrain Grand Prix","Circuit":{"circuitId":"bahrain","url":"http://en.wikipedia.org/wiki/Bahrain_International_Circuit","circuitName":"Bahrain International Circuit","Location":{"lat":"26.0325","long":"50.5106","locality":"Sakhir","country":"Bahrain"}},"date":"2024-03-02","time":"15:00:00Z","Results":[{"number":"1","position":"1","positionText":"1","points":"26","Driver":{"driverId":"max_verstappen","permanentNumber":"33","code":"VER","url":"http:\/\/en.wikipedia.org\/wiki\/Max_Verstappen","givenName":"Max","familyName":"Verstappen","dateOfBirth":"1997-09-30","nationality":"Dutch"},"Constructor":{"constructorId":"red_bull","url":"http:\/\/en.wikipedia.org\/wiki\/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},"grid":"1","laps":"57","status":"Finished","Time":{"millis":"5504742","time":"1:31:44.742"},"FastestLap":{"rank":"1","lap":"39","Time":{"time":"1:32.608"},"AverageSpeed":{"units":"kph","speed":"210.383"}}},{"number":"11","position":"2","positionText":"2","points":"18","Driver":{"driverId":"perez","permanentNumber":"11","code":"PER","url":"http:\/\/en.wikipedia.org\/wiki\/Sergio_P%C3%A9rez","givenName":"Sergio","familyName":"Pérez","dateOfBirth":"1990-01-26","nationality":"Mexican"},"Constructor":{"constructorId":"red_bull","url":"http:\/\/en.wikipedia.org\/wiki\/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},"grid":"5","laps":"57","status":"Finished","Time":{"millis":"5527199","time":"+22.457"},"FastestLap":{"rank":"4","lap":"40","Time":{"time":"1:34.364"},"AverageSpeed":{"units":"kph","speed":"206.468"}}},{"number":"55","position":"3","positionText":"3","points":"15","Driver":{"driverId":"sainz","permanentNumber":"55","code":"SAI","url":"http:\/\/en.wikipedia.org\/wiki\/Carlos_Sainz_Jr.","givenName":"Carlos","familyName":"Sainz","dateOfBirth":"1994-09-01","nationality":"Spanish"},"Constructor":{"constructorId":"ferrari","url":"http:\/\/en.wikipedia.org\/wiki\/Scuderia_Ferrari","name":"Ferrari","nationality":"Italian"},"grid":"4","laps":"57","status":"Finished","Time":{"millis":"5529852","time":"+25.110"},"FastestLap":{"rank":"6","lap":"44","Time":{"time":"1:34.507"},"AverageSpeed":{"units":"kph","speed":"206.156"}}},{"number":"16","position":"4","positionText":"4","points":"12","Driver":{"driverId":"leclerc","permanentNumber":"16","code":"LEC","url":"http:\/\/en.wikipedia.org\/wiki\/Charles_Leclerc","givenName":"Charles","familyName":"Leclerc","dateOfBirth":"1997-10-16","nationality":"Monegasque"},"Constructor":{"constructorId":"ferrari","url":"http:\/\/en.wikipedia.org\/wiki\/Scuderia_Ferrari","name":"Ferrari","nationality":"Italian"},"grid":"2","laps":"57","status":"Finished","Time":{"millis":"5544411","time":"+39.669"},"FastestLap":{"rank":"2","lap":"36","Time":{"time":"1:34.090"},"AverageSpeed":{"units":"kph","speed":"207.069"}}},{"number":"63","position":"5","positionText":"5","points":"10","Driver":{"driverId":"russell","permanentNumber":"63","code":"RUS","url":"http:\/\/en.wikipedia.org\/wiki\/George_Russell_(racing_driver)","givenName":"George","familyName":"Russell","dateOfBirth":"1998-02-15","nationality":"British"},"Constructor":{"constructorId":"mercedes","url":"http:\/\/en.wikipedia.org\/wiki\/Mercedes-Benz_in_Formula_One","name":"Mercedes","nationality":"German"},"grid":"3","laps":"57","status":"Finished","Time":{"millis":"5551530","time":"+46.788"},"FastestLap":{"rank":"12","lap":"40","Time":{"time":"1:35.065"},"AverageSpeed":{"units":"kph","speed":"204.946"}}},{"number":"4","position":"6","positionText":"6","points":"8","Driver":{"driverId":"norris","permanentNumber":"4","code":"NOR","url":"http:\/\/en.wikipedia.org\/wiki\/Lando_Norris","givenName":"Lando","familyName":"Norris","dateOfBirth":"1999-11-13","nationality":"British"},"Constructor":{"constructorId":"mclaren","url":"http:\/\/en.wikipedia.org\/wiki\/McLaren","name":"McLaren","nationality":"British"},"grid":"7","laps":"57","status":"Finished","Time":{"millis":"5553200","time":"+48.458"},"FastestLap":{"rank":"5","lap":"1","Time":{"time":"1:34.476"},"AverageSpeed":{"units":"kph","speed":"206.223"}}},{"number":"44","position":"7","positionText":"7","points":"6","Driver":{"driverId":"hamilton","permanentNumber":"44","code":"HAM","url":"http:\/\/en.wikipedia.org\/wiki\/Lewis_Hamilton","givenName":"Lewis","familyName":"Hamilton","dateOfBirth":"1985-01-07","nationality":"British"},"Constructor":{"constructorId":"mercedes","url":"http:\/\/en.wikipedia.org\/wiki\/Mercedes-Benz_in_Formula_One","name":"Mercedes","nationality":"German"},"grid":"9","laps":"57","status":"Finished","Time":{"millis":"5555066","time":"+50.324"},"FastestLap":{"rank":"7","lap":"39","Time":{"time":"1:34.722"},"AverageSpeed":{"units":"kph","speed":"205.688"}}},{"number":"81","position":"8","positionText":"8","points":"4","Driver":{"driverId":"piastri","permanentNumber":"81","code":"PIA","url":"http:\/\/en.wikipedia.org\/wiki\/Oscar_Piastri","givenName":"Oscar","familyName":"Piastri","dateOfBirth":"2001-04-06","nationality":"Australian"},"Constructor":{"constructorId":"mclaren","url":"http:\/\/en.wikipedia.org\/wiki\/McLaren","name":"McLaren","nationality":"British"},"grid":"8","laps":"57","status":"Finished","Time":{"millis":"5560824","time":"+56.082"},"FastestLap":{"rank":"11","lap":"1","Time":{"time":"1:34.983"},"AverageSpeed":{"units":"kph","speed":"205.123"}}},{"number":"14","position":"9","positionText":"9","points":"2","Driver":{"driverId":"alonso","permanentNumber":"14","code":"ALO","url":"http:\/\/en.wikipedia.org\/wiki\/Fernando_Alonso","givenName":"Fernando","familyName":"Alonso","dateOfBirth":"1981-07-29","nationality":"Spanish"},"Constructor":{"constructorId":"aston_martin","url":"http:\/\/en.wikipedia.org\/wiki\/Aston_Martin_in_Formula_One","name":"Aston Martin","nationality":"British"},"grid":"6","laps":"57","status":"Finished","Time":{"millis":"5579629","time":"+1:14.887"},"FastestLap":{"rank":"3","lap":"48","Time":{"time":"1:34.199"},"AverageSpeed":{"units":"kph","speed":"206.830"}}},{"number":"18","position":"10","positionText":"10","points":"1","Driver":{"driverId":"stroll","permanentNumber":"18","code":"STR","url":"http:\/\/en.wikipedia.org\/wiki\/Lance_Stroll","givenName":"Lance","familyName":"Stroll","dateOfBirth":"1998-10-29","nationality":"Canadian"},"Constructor":{"constructorId":"aston_martin","url":"http:\/\/en.wikipedia.org\/wiki\/Aston_Martin_in_Formula_One","name":"Aston Martin","nationality":"British"},"grid":"12","laps":"57","status":"Finished","Time":{"millis":"5597958","time":"+1:33.216"},"FastestLap":{"rank":"16","lap":"30","Time":{"time":"1:35.632"},"AverageSpeed":{"units":"kph","speed":"203.730"}}},{"number":"24","position":"11","positionText":"11","points":"0","Driver":{"driverId":"zhou","permanentNumber":"24","code":"ZHO","url":"http:\/\/en.wikipedia.org\/wiki\/Zhou_Guanyu","givenName":"Guanyu","familyName":"Zhou","dateOfBirth":"1999-05-30","nationality":"Chinese"},"Constructor":{"constructorId":"sauber","url":"http:\/\/en.wikipedia.org\/wiki\/Sauber","name":"Sauber","nationality":"Swiss"},"grid":"17","laps":"56","status":"+1 Lap","FastestLap":{"rank":"14","lap":"30","Time":{"time":"1:35.458"},"AverageSpeed":{"units":"kph","speed":"204.102"}}},{"number":"20","position":"12","positionText":"12","points":"0","Driver":{"driverId":"kevin_magnussen","permanentNumber":"20","code":"MAG","url":"http:\/\/en.wikipedia.org\/wiki\/Kevin_Magnussen","givenName":"Kevin","familyName":"Magnussen","dateOfBirth":"1992-10-05","nationality":"Danish"},"Constructor":{"constructorId":"haas","url":"http:\/\/en.wikipedia.org\/wiki\/Haas_F1_Team","name":"Haas F1 Team","nationality":"American"},"grid":"15","laps":"56","status":"+1 Lap","FastestLap":{"rank":"15","lap":"34","Time":{"time":"1:35.570"},"AverageSpeed":{"units":"kph","speed":"203.863"}}},{"number":"3","position":"13","positionText":"13","points":"0","Driver":{"driverId":"ricciardo","permanentNumber":"3","code":"RIC","url":"http:\/\/en.wikipedia.org\/wiki\/Daniel_Ricciardo","givenName":"Daniel","familyName":"Ricciardo","dateOfBirth":"1989-07-01","nationality":"Australian"},"Constructor":{"constructorId":"rb","url":"http:\/\/en.wikipedia.org\/wiki\/RB_Formula_One_Team","name":"RB F1 Team","nationality":"Italian"},"grid":"14","laps":"56","status":"+1 Lap","FastestLap":{"rank":"13","lap":"37","Time":{"time":"1:35.163"},"AverageSpeed":{"units":"kph","speed":"204.735"}}},{"number":"22","position":"14","positionText":"14","points":"0","Driver":{"driverId":"tsunoda","permanentNumber":"22","code":"TSU","url":"http:\/\/en.wikipedia.org\/wiki\/Yuki_Tsunoda","givenName":"Yuki","familyName":"Tsunoda","dateOfBirth":"2000-05-11","nationality":"Japanese"},"Constructor":{"constructorId":"rb","url":"http:\/\/en.wikipedia.org\/wiki\/RB_Formula_One_Team","name":"RB F1 Team","nationality":"Italian"},"grid":"11","laps":"56","status":"+1 Lap","FastestLap":{"rank":"18","lap":"37","Time":{"time":"1:35.833"},"AverageSpeed":{"units":"kph","speed":"203.303"}}},{"number":"23","position":"15","positionText":"15","points":"0","Driver":{"driverId":"albon","permanentNumber":"23","code":"ALB","url":"http:\/\/en.wikipedia.org\/wiki\/Alexander_Albon","givenName":"Alexander","familyName":"Albon","dateOfBirth":"1996-03-23","nationality":"Thai"},"Constructor":{"constructorId":"williams","url":"http:\/\/en.wikipedia.org\/wiki\/Williams_Grand_Prix_Engineering","name":"Williams","nationality":"British"},"grid":"13","laps":"56","status":"+1 Lap","FastestLap":{"rank":"17","lap":"40","Time":{"time":"1:35.723"},"AverageSpeed":{"units":"kph","speed":"203.537"}}},{"number":"27","position":"16","positionText":"16","points":"0","Driver":{"driverId":"hulkenberg","permanentNumber":"27","code":"HUL","url":"http:\/\/en.wikipedia.org\/wiki\/Nico_H%C3%BClkenberg","givenName":"Nico","familyName":"Hülkenberg","dateOfBirth":"1987-08-19","nationality":"German"},"Constructor":{"constructorId":"haas","url":"http:\/\/en.wikipedia.org\/wiki\/Haas_F1_Team","name":"Haas F1 Team","nationality":"American"},"grid":"10","laps":"56","status":"+1 Lap","FastestLap":{"rank":"10","lap":"46","Time":{"time":"1:34.834"},"AverageSpeed":{"units":"kph","speed":"205.445"}}},{"number":"31","position":"17","positionText":"17","points":"0","Driver":{"driverId":"ocon","permanentNumber":"31","code":"OCO","url":"http:\/\/en.wikipedia.org\/wiki\/Esteban_Ocon","givenName":"Esteban","familyName":"Ocon","dateOfBirth":"1996-09-17","nationality":"French"},"Constructor":{"constructorId":"alpine","url":"http:\/\/en.wikipedia.org\/wiki\/Alpine_F1_Team","name":"Alpine F1 Team","nationality":"French"},"grid":"19","laps":"56","status":"+1 Lap","FastestLap":{"rank":"20","lap":"34","Time":{"time":"1:36.226"},"AverageSpeed":{"units":"kph","speed":"202.473"}}},{"number":"10","position":"18","positionText":"18","points":"0","Driver":{"driverId":"gasly","permanentNumber":"10","code":"GAS","url":"http:\/\/en.wikipedia.org\/wiki\/Pierre_Gasly","givenName":"Pierre","familyName":"Gasly","dateOfBirth":"1996-02-07","nationality":"French"},"Constructor":{"constructorId":"alpine","url":"http:\/\/en.wikipedia.org\/wiki\/Alpine_F1_Team","name":"Alpine F1 Team","nationality":"French"},"grid":"20","laps":"56","status":"+1 Lap","FastestLap":{"rank":"9","lap":"45","Time":{"time":"1:34.805"},"AverageSpeed":{"units":"kph","speed":"205.508"}}},{"number":"77","position":"19","positionText":"19","points":"0","Driver":{"driverId":"bottas","permanentNumber":"77","code":"BOT","url":"http:\/\/en.wikipedia.org\/wiki\/Valtteri_Bottas","givenName":"Valtteri","familyName":"Bottas","dateOfBirth":"1989-08-28","nationality":"Finnish"},"Constructor":{"constructorId":"sauber","url":"http:\/\/en.wikipedia.org\/wiki\/Sauber","name":"Sauber","nationality":"Swiss"},"grid":"16","laps":"56","status":"+1 Lap","FastestLap":{"rank":"19","lap":"33","Time":{"time":"1:36.202"},"AverageSpeed":{"units":"kph","speed":"202.523"}}},{"number":"2","position":"20","positionText":"20","points":"0","Driver":{"driverId":"sargeant","permanentNumber":"2","code":"SAR","url":"http:\/\/en.wikipedia.org\/wiki\/Logan_Sargeant","givenName":"Logan","familyName":"Sargeant","dateOfBirth":"2000-12-31","nationality":"American"},"Constructor":{"constructorId":"williams","url":"http:\/\/en.wikipedia.org\/wiki\/Williams_Grand_Prix_Engineering","name":"Williams","nationality":"British"},"grid":"18","laps":"55","status":"+2 Laps","FastestLap":{"rank":"8","lap":"42","Time":{"time":"1:34.735"},"AverageSpeed":{"units":"kph","speed":"205.659"}}}]}]}}};
export const resultTwo = {"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.5","series":"f1","url":"http://ergast.com/api/f1/2024/2/results.json","limit":"30","offset":"0","total":"20","RaceTable":{"season":"2024","round":"2","Races":[{"season":"2024","round":"2","url":"https:\/\/en.wikipedia.org\/wiki\/2024_Saudi_Arabian_Grand_Prix","raceName":"Saudi Arabian Grand Prix","Circuit":{"circuitId":"jeddah","url":"http://en.wikipedia.org/wiki/Jeddah_Street_Circuit","circuitName":"Jeddah Corniche Circuit","Location":{"lat":"21.6319","long":"39.1044","locality":"Jeddah","country":"Saudi Arabia"}},"date":"2024-03-09","time":"17:00:00Z","Results":[{"number":"1","position":"1","positionText":"1","points":"25","Driver":{"driverId":"max_verstappen","permanentNumber":"33","code":"VER","url":"http:\/\/en.wikipedia.org\/wiki\/Max_Verstappen","givenName":"Max","familyName":"Verstappen","dateOfBirth":"1997-09-30","nationality":"Dutch"},"Constructor":{"constructorId":"red_bull","url":"http:\/\/en.wikipedia.org\/wiki\/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},"grid":"1","laps":"50","status":"Finished","Time":{"millis":"4843273","time":"1:20:43.273"},"FastestLap":{"rank":"3","lap":"50","Time":{"time":"1:31.773"},"AverageSpeed":{"units":"kph","speed":"242.188"}}},{"number":"11","position":"2","positionText":"2","points":"18","Driver":{"driverId":"perez","permanentNumber":"11","code":"PER","url":"http:\/\/en.wikipedia.org\/wiki\/Sergio_P%C3%A9rez","givenName":"Sergio","familyName":"Pérez","dateOfBirth":"1990-01-26","nationality":"Mexican"},"Constructor":{"constructorId":"red_bull","url":"http:\/\/en.wikipedia.org\/wiki\/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},"grid":"3","laps":"50","status":"Finished","Time":{"millis":"4862704","time":"+13.6431"},"FastestLap":{"rank":"8","lap":"37","Time":{"time":"1:32.273"},"AverageSpeed":{"units":"kph","speed":"240.876"}}},{"number":"16","position":"3","positionText":"3","points":"16","Driver":{"driverId":"leclerc","permanentNumber":"16","code":"LEC","url":"http:\/\/en.wikipedia.org\/wiki\/Charles_Leclerc","givenName":"Charles","familyName":"Leclerc","dateOfBirth":"1997-10-16","nationality":"Monegasque"},"Constructor":{"constructorId":"ferrari","url":"http:\/\/en.wikipedia.org\/wiki\/Scuderia_Ferrari","name":"Ferrari","nationality":"Italian"},"grid":"2","laps":"50","status":"Finished","Time":{"millis":"4861912","time":"+18.639"},"FastestLap":{"rank":"1","lap":"50","Time":{"time":"1:31.632"},"AverageSpeed":{"units":"kph","speed":"242.561"}}},{"number":"81","position":"4","positionText":"4","points":"12","Driver":{"driverId":"piastri","permanentNumber":"81","code":"PIA","url":"http:\/\/en.wikipedia.org\/wiki\/Oscar_Piastri","givenName":"Oscar","familyName":"Piastri","dateOfBirth":"2001-04-06","nationality":"Australian"},"Constructor":{"constructorId":"mclaren","url":"http:\/\/en.wikipedia.org\/wiki\/McLaren","name":"McLaren","nationality":"British"},"grid":"5","laps":"50","status":"Finished","Time":{"millis":"4875280","time":"+32.007"},"FastestLap":{"rank":"10","lap":"1","Time":{"time":"1:32.310"},"AverageSpeed":{"units":"kph","speed":"240.779"}}},{"number":"14","position":"5","positionText":"5","points":"10","Driver":{"driverId":"alonso","permanentNumber":"14","code":"ALO","url":"http:\/\/en.wikipedia.org\/wiki\/Fernando_Alonso","givenName":"Fernando","familyName":"Alonso","dateOfBirth":"1981-07-29","nationality":"Spanish"},"Constructor":{"constructorId":"aston_martin","url":"http:\/\/en.wikipedia.org\/wiki\/Aston_Martin_in_Formula_One","name":"Aston Martin","nationality":"British"},"grid":"4","laps":"50","status":"Finished","Time":{"millis":"4879032","time":"+35.759"},"FastestLap":{"rank":"13","lap":"43","Time":{"time":"1:32.387"},"AverageSpeed":{"units":"kph","speed":"240.579"}}},{"number":"63","position":"6","positionText":"6","points":"8","Driver":{"driverId":"russell","permanentNumber":"63","code":"RUS","url":"http:\/\/en.wikipedia.org\/wiki\/George_Russell_(racing_driver)","givenName":"George","familyName":"Russell","dateOfBirth":"1998-02-15","nationality":"British"},"Constructor":{"constructorId":"mercedes","url":"http:\/\/en.wikipedia.org\/wiki\/Mercedes-Benz_in_Formula_One","name":"Mercedes","nationality":"German"},"grid":"7","laps":"50","status":"Finished","Time":{"millis":"4883209","time":"+39.936"},"FastestLap":{"rank":"7","lap":"42","Time":{"time":"1:32.254"},"AverageSpeed":{"units":"kph","speed":"240.926"}}},{"number":"38","position":"7","positionText":"7","points":"6","Driver":{"driverId":"bearman","permanentNumber":"38","code":"BEA","url":"http:\/\/en.wikipedia.org\/wiki\/Oliver_Bearman","givenName":"Oliver","familyName":"Bearman","dateOfBirth":"","nationality":"British"},"Constructor":{"constructorId":"ferrari","url":"http:\/\/en.wikipedia.org\/wiki\/Scuderia_Ferrari","name":"Ferrari","nationality":"Italian"},"grid":"11","laps":"50","status":"Finished","Time":{"millis":"4885952","time":"+42.679"},"FastestLap":{"rank":"5","lap":"50","Time":{"time":"1:32.186"},"AverageSpeed":{"units":"kph","speed":"241.103"}}},{"number":"4","position":"8","positionText":"8","points":"4","Driver":{"driverId":"norris","permanentNumber":"4","code":"NOR","url":"http:\/\/en.wikipedia.org\/wiki\/Lando_Norris","givenName":"Lando","familyName":"Norris","dateOfBirth":"1999-11-13","nationality":"British"},"Constructor":{"constructorId":"mclaren","url":"http:\/\/en.wikipedia.org\/wiki\/McLaren","name":"McLaren","nationality":"British"},"grid":"6","laps":"50","status":"Finished","Time":{"millis":"4888981","time":"+45.708"},"FastestLap":{"rank":"4","lap":"1","Time":{"time":"1:31.944"},"AverageSpeed":{"units":"kph","speed":"241.738"}}},{"number":"44","position":"9","positionText":"9","points":"2","Driver":{"driverId":"hamilton","permanentNumber":"44","code":"HAM","url":"http:\/\/en.wikipedia.org\/wiki\/Lewis_Hamilton","givenName":"Lewis","familyName":"Hamilton","dateOfBirth":"1985-01-07","nationality":"British"},"Constructor":{"constructorId":"mercedes","url":"http:\/\/en.wikipedia.org\/wiki\/Mercedes-Benz_in_Formula_One","name":"Mercedes","nationality":"German"},"grid":"8","laps":"50","status":"Finished","Time":{"millis":"4890664","time":"+47.391"},"FastestLap":{"rank":"2","lap":"38","Time":{"time":"1:31.746"},"AverageSpeed":{"units":"kph","speed":"242.260"}}},{"number":"27","position":"10","positionText":"10","points":"1","Driver":{"driverId":"hulkenberg","permanentNumber":"27","code":"HUL","url":"http:\/\/en.wikipedia.org\/wiki\/Nico_H%C3%BClkenberg","givenName":"Nico","familyName":"Hülkenberg","dateOfBirth":"1987-08-19","nationality":"German"},"Constructor":{"constructorId":"haas","url":"http:\/\/en.wikipedia.org\/wiki\/Haas_F1_Team","name":"Haas F1 Team","nationality":"American"},"grid":"15","laps":"50","status":"Finished","Time":{"millis":"4920269","time":"+1:16.996"},"FastestLap":{"rank":"12","lap":"49","Time":{"time":"1:32.366"},"AverageSpeed":{"units":"kph","speed":"240.633"}}},{"number":"23","position":"11","positionText":"11","points":"0","Driver":{"driverId":"albon","permanentNumber":"23","code":"ALB","url":"http:\/\/en.wikipedia.org\/wiki\/Alexander_Albon","givenName":"Alexander","familyName":"Albon","dateOfBirth":"1996-03-23","nationality":"Thai"},"Constructor":{"constructorId":"williams","url":"http:\/\/en.wikipedia.org\/wiki\/Williams_Grand_Prix_Engineering","name":"Williams","nationality":"British"},"grid":"12","laps":"50","status":"Finished","Time":{"millis":"4931627","time":"+1:28.354"},"FastestLap":{"rank":"9","lap":"50","Time":{"time":"1:32.307"},"AverageSpeed":{"units":"kph","speed":"240.787"}}},{"number":"20","position":"12","positionText":"12","points":"0","Driver":{"driverId":"kevin_magnussen","permanentNumber":"20","code":"MAG","url":"http:\/\/en.wikipedia.org\/wiki\/Kevin_Magnussen","givenName":"Kevin","familyName":"Magnussen","dateOfBirth":"1992-10-05","nationality":"Danish"},"Constructor":{"constructorId":"haas","url":"http:\/\/en.wikipedia.org\/wiki\/Haas_F1_Team","name":"Haas F1 Team","nationality":"American"},"grid":"13","laps":"50","status":"Finished","Time":{"millis":"4955646","time":"+1:45.7373"},"FastestLap":{"rank":"11","lap":"47","Time":{"time":"1:32.338"},"AverageSpeed":{"units":"kph","speed":"240.706"}}},{"number":"31","position":"13","positionText":"13","points":"0","Driver":{"driverId":"ocon","permanentNumber":"31","code":"OCO","url":"http:\/\/en.wikipedia.org\/wiki\/Esteban_Ocon","givenName":"Esteban","familyName":"Ocon","dateOfBirth":"1996-09-17","nationality":"French"},"Constructor":{"constructorId":"alpine","url":"http:\/\/en.wikipedia.org\/wiki\/Alpine_F1_Team","name":"Alpine F1 Team","nationality":"French"},"grid":"17","laps":"49","status":"+1 Lap","FastestLap":{"rank":"17","lap":"48","Time":{"time":"1:33.481"},"AverageSpeed":{"units":"kph","speed":"237.763"}}},{"number":"22","position":"14","positionText":"14","points":"0","Driver":{"driverId":"tsunoda","permanentNumber":"22","code":"TSU","url":"http:\/\/en.wikipedia.org\/wiki\/Yuki_Tsunoda","givenName":"Yuki","familyName":"Tsunoda","dateOfBirth":"2000-05-11","nationality":"Japanese"},"Constructor":{"constructorId":"rb","url":"http:\/\/en.wikipedia.org\/wiki\/RB_Formula_One_Team","name":"RB F1 Team","nationality":"Italian"},"grid":"9","laps":"49","status":"+1 Lap","FastestLap":{"rank":"18","lap":"44","Time":{"time":"1:33.523"},"AverageSpeed":{"units":"kph","speed":"237.657"}}},{"number":"2","position":"15","positionText":"15","points":"0","Driver":{"driverId":"sargeant","permanentNumber":"2","code":"SAR","url":"http:\/\/en.wikipedia.org\/wiki\/Logan_Sargeant","givenName":"Logan","familyName":"Sargeant","dateOfBirth":"2000-12-31","nationality":"American"},"Constructor":{"constructorId":"williams","url":"http:\/\/en.wikipedia.org\/wiki\/Williams_Grand_Prix_Engineering","name":"Williams","nationality":"British"},"grid":"19","laps":"49","status":"+1 Lap","FastestLap":{"rank":"15","lap":"49","Time":{"time":"1:33.026"},"AverageSpeed":{"units":"kph","speed":"238.926"}}},{"number":"3","position":"16","positionText":"16","points":"0","Driver":{"driverId":"ricciardo","permanentNumber":"3","code":"RIC","url":"http:\/\/en.wikipedia.org\/wiki\/Daniel_Ricciardo","givenName":"Daniel","familyName":"Ricciardo","dateOfBirth":"1989-07-01","nationality":"Australian"},"Constructor":{"constructorId":"rb","url":"http:\/\/en.wikipedia.org\/wiki\/RB_Formula_One_Team","name":"RB F1 Team","nationality":"Italian"},"grid":"14","laps":"49","status":"+1 Lap","FastestLap":{"rank":"16","lap":"47","Time":{"time":"1:33.323"},"AverageSpeed":{"units":"kph","speed":"238.166"}}},{"number":"77","position":"17","positionText":"17","points":"0","Driver":{"driverId":"bottas","permanentNumber":"77","code":"BOT","url":"http:\/\/en.wikipedia.org\/wiki\/Valtteri_Bottas","givenName":"Valtteri","familyName":"Bottas","dateOfBirth":"1989-08-28","nationality":"Finnish"},"Constructor":{"constructorId":"sauber","url":"http:\/\/en.wikipedia.org\/wiki\/Sauber","name":"Sauber","nationality":"Swiss"},"grid":"16","laps":"49","status":"+1 Lap","FastestLap":{"rank":"14","lap":"49","Time":{"time":"1:32.706"},"AverageSpeed":{"units":"kph","speed":"239.751"}}},{"number":"24","position":"18","positionText":"18","points":"0","Driver":{"driverId":"zhou","permanentNumber":"24","code":"ZHO","url":"http:\/\/en.wikipedia.org\/wiki\/Zhou_Guanyu","givenName":"Guanyu","familyName":"Zhou","dateOfBirth":"1999-05-30","nationality":"Chinese"},"Constructor":{"constructorId":"sauber","url":"http:\/\/en.wikipedia.org\/wiki\/Sauber","name":"Sauber","nationality":"Swiss"},"grid":"20","laps":"49","status":"+1 Lap","FastestLap":{"rank":"6","lap":"49","Time":{"time":"1:32.208"},"AverageSpeed":{"units":"kph","speed":"241.046"}}},{"number":"18","position":"19","positionText":"R","points":"0","Driver":{"driverId":"stroll","permanentNumber":"18","code":"STR","url":"http:\/\/en.wikipedia.org\/wiki\/Lance_Stroll","givenName":"Lance","familyName":"Stroll","dateOfBirth":"1998-10-29","nationality":"Canadian"},"Constructor":{"constructorId":"aston_martin","url":"http:\/\/en.wikipedia.org\/wiki\/Aston_Martin_in_Formula_One","name":"Aston Martin","nationality":"British"},"grid":"10","laps":"5","status":"Accident","FastestLap":{"rank":"19","lap":"5","Time":{"time":"1:35.560"},"AverageSpeed":{"units":"kph","speed":"232.591"}}},{"number":"10","position":"20","positionText":"R","points":"0","Driver":{"driverId":"gasly","permanentNumber":"10","code":"GAS","url":"http:\/\/en.wikipedia.org\/wiki\/Pierre_Gasly","givenName":"Pierre","familyName":"Gasly","dateOfBirth":"1996-02-07","nationality":"French"},"Constructor":{"constructorId":"alpine","url":"http:\/\/en.wikipedia.org\/wiki\/Alpine_F1_Team","name":"Alpine F1 Team","nationality":"French"},"grid":"18","laps":"1","status":"Gearbox"}]}]}}};