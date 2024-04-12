const csvTOJSON = require("../util.js");
const fs = require("fs");

const matchesFilePath = "../data/matches.csv";
const deliveriesFilePath = "../data/deliveries.csv";
const filepath = "../public/output/top10EconomicalBowlers.json";

function top10EconomicBowlersIn2015() {

  const matchData = csvTOJSON(matchesFilePath);

    const idSet = matchData
      .filter(match => match.season === "2015")
      .map(match => match.id);

    const deliveriesData = csvTOJSON(deliveriesFilePath);

    const bowlerStats = deliveriesData.reduce((stats, delivery) => {
      if (idSet.includes(delivery.match_id)) {
        const bowler = delivery.bowler;
        const runs = parseInt(delivery.batsman_runs) + parseInt(delivery.wide_runs) + parseInt(delivery.noball_runs);
        stats[bowler] = stats[bowler] || { runs: 0, balls: 0 };
        stats[bowler].runs += runs;
        stats[bowler].balls++;
      }
      return stats;
    }, {});

    const economy = Object.keys(bowlerStats).reduce((economy, bowler) => {
      economy[bowler] = (bowlerStats[bowler].runs / bowlerStats[bowler].balls) * 6;
      return economy;
    }, {});

    const economyArray = Object.entries(economy).sort((a, b) => a[1] - b[1]);
    const top10EconomicBowlers = economyArray.slice(0, 10);

  fs.writeFileSync(
    filepath,
    JSON.stringify(top10EconomicBowlers, null, 2),
    (err) => {
      if (err) {
        console.log(err, "Error writing the file");
      } else {
        console.log("Result written in the output");
      }
    }
  );
}

top10EconomicBowlersIn2015();
