const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/highestPlayerDismissalPlayer.json";

function findDismissals() {
     try{
        const dismissals = {};
            
          const deliveries= csvToJson(path);
     
          
                deliveries.forEach((delivery) => {
                    const dismissedPlayer = delivery.player_dismissed;
                    const dismissedBy = delivery.bowler;

                    if (dismissedPlayer && dismissedBy) {
                        const key = `${dismissedPlayer}_${dismissedBy}`;
                        if (dismissals[key]) {
                            dismissals[key]++;
                        } else {
                            dismissals[key] = 1;
                        }
                    }
                });

                // Find the maximum number of dismissals
                let maxDismissals = 0;
                let maxDismissalsPair = null;
                for (const pair in dismissals) {
                    if (dismissals[pair] > maxDismissals) {
                        maxDismissals = dismissals[pair];
                        maxDismissalsPair = pair;
                    }
                }

                const result={ playerPair: maxDismissalsPair, dismissals: maxDismissals };
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


findDismissals();
    
