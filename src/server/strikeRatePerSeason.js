const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/strikeRate.json";

function strikeRatePerSeason(playerName) {
  try {


    // Read matches data
    const matches = csvToJson(csvFilePath);
    const deliveries = csvToJson(path);

    // Iterate through deliveries to calculate strike rate per year
    const strikeRatePerYear = deliveries.reduce((acc, delivery) => {
      const match = matches.find(match => match.id === delivery.match_id);
      if (match && delivery.batsman === playerName) {
        const year = match.season;
        const runs = parseInt(delivery.batsman_runs);
        acc[year] = acc[year] || { runs: 0, balls: 0 };
        acc[year].runs += runs;
        acc[year].balls++;
      }
      return acc;
    }, {});

    const result = Object.entries(strikeRatePerYear).reduce((acc, [year, { runs, balls }]) => {
      const strikeRate = (runs / balls) * 100 || 0; // Handle division by zero
      acc[year] = strikeRate.toFixed(2);
      return acc;
    }, {});

    const data = JSON.stringify(result, null, 2);
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

strikeRatePerSeason("V Kohli");
