const csvTOJSON =require("../util.js");
const fs = require("fs");

const matchesFilePath = "../data/matches.csv";
const deliveriesFilepath = "../data/deliveries.csv"
const filepath="../public/output/top10EconomicalBowlers.json"

function top10EconomicBowlersIn2015(){
   try{
    const matchData=csvTOJSON(matchesFilePath);

   
        let idSet = [];
        for(let index=0;index<matchData.length;index++){
            if(matchData[index].season=="2015"){
                idSet.push(matchData[index].id);
            }
        }
        // console.log(idSet);
      const deleveriesData  =csvTOJSON(deliveriesFilepath);
            let runConceded = {};
           let balls ={};
            for(let index =0; index<deleveriesData.length;index++){
                if(idSet.includes(deleveriesData[index].match_id)){
                    if(!runConceded[deleveriesData[index].bowler]){
                        runConceded[deleveriesData[index].bowler]=(Number(deleveriesData[index].wide_runs)+Number(deleveriesData[index].noball_runs)+Number(deleveriesData[index].batsman_runs));
                        //if(deleveriesData[index].wide_runs==0 && deleveriesData[index].noball_runs==0){
                             balls[deleveriesData[index].bowler]=1;
                        // }else{
                        //     balls[deleveriesData[index].bowler]=0;
                        // }
                    }else{
                        runConceded[deleveriesData[index].bowler]+=(Number(deleveriesData[index].wide_runs)+Number(deleveriesData[index].noball_runs)+Number(deleveriesData[index].batsman_runs));
                       // if(deleveriesData[index].wide_runs==0 && deleveriesData[index].noball_runs==0){
                            balls[deleveriesData[index].bowler]++;
                       // }
                    }
                    //  console.log(runConceded);
                    //  console.log(balls);
                }
            }
            let economy ={};
            for (let bowler in runConceded) {
                economy[bowler] = (runConceded[bowler] / balls[bowler]) * 6;
            }
            let economyArray = [];
            for (let bowler in economy) {
                economyArray.push([bowler, economy[bowler]]);
            }

            for (let index1 = 0; index1 < economyArray.length - 1; index1++) {
                for (let index2 = index1+1; index2 < economyArray.length; index2++) {
                    if (economyArray[index1][1] > economyArray[index2][1]) {
                        let temp = economyArray[index1];
                        economyArray[index1] = economyArray[index2];
                        economyArray[index2] = temp;
                    }
                }
            }

            let top10EconomicBowlers = economyArray.slice(0, 10);
            
            fs.writeFileSync(filepath,JSON.stringify(top10EconomicBowlers, null, 2),
            (err) => {
              if (err) {
                console.log(err, "Error writing the file");
              } else {
                console.log("Result written in the output");
            }
            }
          );
   }catch(error){
       console.error('Error is :',error.message);
   }
}

top10EconomicBowlersIn2015();