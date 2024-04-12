const fs = require("fs");
const csvToJson = require("../util.js");

const path = "../data/deliveries.csv";

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/bestEconomySuperOver.json";

function findBestSuperOverEconomy() {
  try {
   
    const deliveries = csvToJson(path);

    const superOverDeliveries = deliveries.filter(
      (delivery) => delivery.is_super_over === "1"
    );

    // Calculate economy rate for each bowler
    const economyMap = superOverDeliveries.reduce((acc, delivery) => {
      const bowler = delivery.bowler;
      const runs = parseInt(delivery.total_runs);
      const extras = parseInt(delivery.extra_runs);
      const balls = 1; // Assuming each delivery is counted as one ball in a super over

      if (!acc[bowler]) {
        acc[bowler] = { runs: 0, balls: 0 };
      }

      acc[bowler].runs += runs - extras;
      acc[bowler].balls += balls;

      return acc;
    }, {});
    
    const calculateEconomyRate = (runs, balls) => (runs / balls) * 6;
    // Calculate economy rate for each bowler
    const economyRates = Object.keys(economyMap).reduce((acc, bowler) => {
      const { runs, balls } = economyMap[bowler];
      acc[bowler] = calculateEconomyRate(runs, balls);
      return acc;
    }, {});


    // Find bowler with the best economy rate
    const [bestBowler, minEconomyRate] = Object.entries(economyRates).reduce(
      (min, [bowler, economyRate]) => {
        return economyRate < min[1] ? [bowler, economyRate] : min;
      },
      [null, Infinity]
    );

    const result = { bestBowler, economyRate: minEconomyRate };

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


findBestSuperOverEconomy();
