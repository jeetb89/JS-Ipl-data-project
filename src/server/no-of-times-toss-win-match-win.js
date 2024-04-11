const csvToJSON = require('../util.js');
const fs = require('fs');

const matchesFilePath = '../data/matches.csv';

function teamWonTossAndMatch() {

    function findTeamWins(data) {
        const tossAndMatchWins = {};

        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            if (!tossAndMatchWins[entry['toss_winner']]) {
                tossAndMatchWins[entry['toss_winner']] = 0;
            }
            if (!tossAndMatchWins[entry['winner']]) {
                tossAndMatchWins[entry['winner']] = 0;
            }
        }

        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            if (entry['toss_winner'] === entry['winner']) {
                tossAndMatchWins[entry['toss_winner']]++;
            }
        }

        return tossAndMatchWins;
    }
             

       const matchesData=csvToJSON(matchesFilePath)
      
            const tossAndMatchWins = findTeamWins(matchesData);

            console.log("File executed");

            fs.writeFileSync("../public/output/teamWonTheTossAndMatch.json", JSON.stringify(tossAndMatchWins, null, 2));
}
     


teamWonTossAndMatch();