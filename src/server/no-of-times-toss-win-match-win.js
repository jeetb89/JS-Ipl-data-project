const csvToJSON = require("../util.js");
const fs = require("fs");

const matchesFilePath = "../data/matches.csv";

function teamWonTossAndMatch() {
  function findTeamWins(data) {
    return data.reduce((tossAndMatchWins, entry) => {
      tossAndMatchWins[entry["toss_winner"]] = (tossAndMatchWins[entry["toss_winner"]] || 0) + 1;
      if (entry["toss_winner"] === entry["winner"]) {
        tossAndMatchWins[entry["toss_winner"]] = (tossAndMatchWins[entry["toss_winner"]] || 0) + 1;
      }
      return tossAndMatchWins;
    }, {});
  }
  const matchesData = csvToJSON(matchesFilePath);

  const tossAndMatchWins = findTeamWins(matchesData);



  fs.writeFileSync(
    "../public/output/teamWonTheTossAndMatch.json",
    JSON.stringify(tossAndMatchWins, null, 2)
  );
}


teamWonTossAndMatch();
