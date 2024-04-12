//Number of matches won per team per year in IPL.

const fs = require("fs");
const csvToJson = require("../util.js");


const csvFilePath = "../data/matches.csv";

const filePath = "../public/output/matchesWonPerTeamPerYear.json";

 function matches_won_per_team_per_year(csvFilePath) {
  try {
    const obj =  csvToJson(csvFilePath);
    const matchesWon = {};
    
   
    for (let record of obj) {
        const { winner, season } = record;

        if (winner) {
            if (matchesWon[winner]) {
                if (matchesWon[winner][season]) {
                    matchesWon[winner][season]++;
                } else {
                    matchesWon[winner][season] = 1;
                }
            } else {
                matchesWon[winner] = { [season]: 1 };
            }
        }
    }

    



    const data = JSON.stringify(matchesWon,null,2);
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