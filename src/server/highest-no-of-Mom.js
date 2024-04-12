const csvTOJSON = require("../util.js");
const fs = require("fs");

const matchesFilepath = "../data/matches.csv";
const filePath = "../public/output/highestMomPerSeason.json";

function highestTimePOTMAwardEachSeason() {
  const matchData = csvTOJSON(matchesFilepath);
 

  const potmPerSeason = matchData.reduce((acc, record) => {
    const { season, player_of_match } = record;

    if (player_of_match) {
      acc[season] = acc[season] || {};
      acc[season][player_of_match] = (acc[season][player_of_match] || 0) + 1;
    }

    return acc;
  }, {});

  // Find the highest MoM per season
  const highestMoMPerSeason = Object.keys(potmPerSeason).reduce(
    (acc, season) => {
      let highestMoM = 0;
      let topPOTM;

      for (let potm in potmPerSeason[season]) {
        if (potmPerSeason[season][potm] > highestMoM) {
          highestMoM = potmPerSeason[season][potm];
          topPOTM = potm;
        }
      }

      acc[season] = {
        player: topPOTM,
        count: highestMoM,
      };

      return acc;
    },
    {}
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(highestMoMPerSeason, null, 2),
    (err) => {
      if (err) {
        console.log(err, "Error !");
      } else {
        console.log("Result written in the output");
      }
    }
  );
}


highestTimePOTMAwardEachSeason();
