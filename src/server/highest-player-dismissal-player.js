const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const filePath = "../public/output/highestPlayerDismissalPlayer.json";

function findDismissals() {
  try{
         
       const deliveries= csvToJson(path);
  
       const countDismissals = deliveries => {
        const dismissals = {};
        deliveries.forEach(delivery => {
            const dismissedPlayer = delivery.player_dismissed;
            const dismissedBy = delivery.bowler;
            if (dismissedPlayer && dismissedBy) {
                const key = `${dismissedPlayer}_${dismissedBy}`;
                dismissals[key] = (dismissals[key] || 0) + 1;
            }
        });
        return dismissals;
    };
    
    const findMaxDismissalsPair = dismissals => {
        return Object.keys(dismissals).reduce((maxPair, pair) => {
            const count = dismissals[pair];
            return count > maxPair.count ? { pair, count } : maxPair;
        }, { pair: null, count: 0 }).pair;
    };
    
    const dismissals = countDismissals(deliveries);
    const maxDismissalsPair = findMaxDismissalsPair(dismissals);
    
    const result = { playerPair: maxDismissalsPair, dismissals: dismissals[maxDismissalsPair] };
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


 findDismissals();