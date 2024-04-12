//const path = require('path');
const fs = require("fs");
const csvToJson = require("../util.js");
//const csvFilePath = path.resolve(__dirname, '../data/matches.csv');

const csvFilePath = "../data/matches.csv";
const filePath = "../public/output/matchesPerYear.json";

function matches_per_year(csvFilePath) {
  try {
    const obj = csvToJson(csvFilePath);
    const matchesPerYear = obj.reduce((accumulator, record) => {
      accumulator[record.season] = (accumulator[record.season] || 0) + 1;
      return accumulator;
    }, {});


    const data = JSON.stringify(matchesPerYear, null, 2);
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

matches_per_year(csvFilePath);
