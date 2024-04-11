
const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/bestEconomySuperOver.json";


function findBestSuperOverEconomy() {
   try{
        const superOverDeliveries = [];
                const deliveries=csvToJson(path);      
       
          
                // Filter deliveries to include only super overs
                deliveries.forEach((delivery) => {
                    if (delivery.is_super_over === '1') {
                        superOverDeliveries.push(delivery);
                    }
                });

                // Calculate economy rate for each bowler
                const economyMap = {};
                superOverDeliveries.forEach((delivery) => {
                    const bowler = delivery.bowler;
                    const runs = parseInt(delivery.total_runs);
                    const extras = parseInt(delivery.extra_runs);
                    const balls = 1; // Assuming each delivery is counted as one ball in a super over

                    if (!economyMap[bowler]) {
                        economyMap[bowler] = { runs: 0, balls: 0 };
                    }

                    economyMap[bowler].runs += (runs - extras);
                    economyMap[bowler].balls += balls;
                });

                // Calculate economy rate for each bowler
                const economyRates = {};
                for (const bowler in economyMap) {
                    const { runs, balls } = economyMap[bowler];
                    const economyRate = (runs / balls) * 6; // Economy rate = (Runs / Balls) * 6 (for one over)
                    economyRates[bowler] = economyRate;
                }

                // Find bowler with the best economy rate
                let bestBowler = null;
                let minEconomyRate = Infinity;
                for (const bowler in economyRates) {
                    if (economyRates[bowler] < minEconomyRate) {
                        bestBowler = bowler;
                        minEconomyRate = economyRates[bowler];
                    }
                }

              const result=  { bestBowler, economyRate: minEconomyRate };

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


    findBestSuperOverEconomy();