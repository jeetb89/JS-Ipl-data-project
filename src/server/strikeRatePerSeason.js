const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/strikeRate.json";

function  strikeRatePerSeason(playerName){

    try {
      const strikeRatePerYear = {};

      // Read matches data
       const matches=csvToJson(csvFilePath);
         const deliveries=csvToJson(path);
          // Iterate through deliveries to calculate strike rate per year
          for (let delivery of deliveries) {
              const matchId = delivery.match_id;
              const match = matches.find(match => match.id === matchId);
              if (match) {
                  const year = match.season;
                  const batsman = delivery.batsman;
                  const runs = parseInt(delivery.batsman_runs);
                  if (batsman === playerName) {
                      if (!strikeRatePerYear[year]) {
                          strikeRatePerYear[year] = { runs: 0, balls: 0 };
                      }
                      strikeRatePerYear[year].runs += runs;
                      strikeRatePerYear[year].balls++;
                  }
              }
          }

          // Calculate strike rate per year
          const result = {};
          for (const year in strikeRatePerYear) {
              const { runs, balls } = strikeRatePerYear[year];
              const strikeRate = (runs / balls) * 100;
              result[year] = strikeRate.toFixed(2); // Round to 2 decimal places
          }


    const data = JSON.stringify(result,null,2);
    fs.writeFileSync(filePath, data, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully!");
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
  }

}

strikeRatePerSeason('V Kohli');

