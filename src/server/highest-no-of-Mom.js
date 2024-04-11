const csvTOJSON =require("../util.js");
const fs = require("fs");

const matchesFilepath = "../data/matches.csv";
const filePath="../public/output/highestMomPerSeason.json"

function highestTimePOTMAwardEachSeason() {

    const matchData=csvTOJSON(matchesFilepath);
        let potmPerSeason = {};

        for (let index = 0; index < matchData.length; index++) {
            let season = matchData[index].season;
            let potm = matchData[index].player_of_match;

            if (potm) {
                if (!potmPerSeason[season]) {
                    potmPerSeason[season] = {};
                }

                if (!potmPerSeason[season][potm]) {
                    potmPerSeason[season][potm] = 1;
                } else {
                    potmPerSeason[season][potm]++;
                }
            }
        }

        let highestMoMPerSeason ={};
        for(let season in potmPerSeason){
            let highestMoM = 0;
            let topPOTM;

            for(let potm in potmPerSeason[season]){
                if(potmPerSeason[season][potm]>highestMoM){
                    highestMoM = potmPerSeason[season][potm];
                    topPOTM = potm;
                }
            }

            highestMoMPerSeason[season]={
                player: topPOTM,
                count: highestMoM
            };
        }

        fs.writeFileSync(filePath, JSON.stringify(highestMoMPerSeason, null, 2),
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