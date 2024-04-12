//Number of matches won per team per year in IPL.

const fs = require("fs");
const csvToJson = require("../util.js");

const csvFilePath = "../data/matches.csv";

const filePath = "../public/output/matchesWonPerTeamPerYear.json";

function matches_won_per_team_per_year(csvFilePath) {
  try {
    const obj = csvToJson(csvFilePath);
    const matchesWon = obj.reduce((accumulator, record) => {
      const { winner, season } = record;

      if (winner) {
        accumulator[winner] = accumulator[winner] || {};
        accumulator[winner][season] = (accumulator[winner][season] || 0) + 1;
      }

      return accumulator;
    }, {});
    
    const data = JSON.stringify(matchesWon, null, 2);
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

matches_won_per_team_per_year(csvFilePath);
