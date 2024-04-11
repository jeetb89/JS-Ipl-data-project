let csvToJson = require("convert-csv-to-json");

function convertCSVToJSON(filePath) {
  let matchesData = csvToJson.getJsonFromCsv(filePath);

  let dataInJSON = [];

  for (let i = 0; i < matchesData.length; i++) {
    let match = matchesData[i];
    const keys = Object.keys(match)[0].split(",");
    const values = Object.values(match)[0].split(",");

    const result = {};
    keys.forEach((key, index) => {
      result[key] = values[index];
    });
    dataInJSON.push(result);
  }
  return dataInJSON;
}

module.exports = convertCSVToJSON;