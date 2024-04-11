//Extra runs conceded per team in the year 2016

const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/extrarunsperteam2016.json";

function extra_runs_conceded_2016() {
  try { 
    const match =  csvToJson(csvFilePath);
    const deliveries= csvToJson(path);
    const extrarunsperteam = {};
      
    for(let records of  match ){
        //Extra runs conceded per team in the year 2016
           
        if(records.season === '2016'){
        
            const {id}  = records;
            
                for (let delivery of deliveries) {
                    if (delivery.match_id === id) {
                        
                        const bowlingTeam = delivery.bowling_team;
                        extrarunsperteam[bowlingTeam] = (extrarunsperteam[bowlingTeam] || 0) + parseInt(delivery.extra_runs);
                  }
                }
            }
    }
     
    const data = JSON.stringify(extrarunsperteam,null,2);
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

extra_runs_conceded_2016();