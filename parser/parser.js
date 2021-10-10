const bfj = require('bfj'); // For Reading large file
const fs = require('fs'); // Using file stream

const stream = fs.createReadStream('./MOCDATA.json');
//const stream = fs.createReadStream('./large-file.json');

bfj.match(stream, (key, value, depth) => depth === 0, { ndjson: true })
  .on('data', object => {
    // Performing BMI logic
    if(object){
        const allData = [];
        var overweightcount = 0;
            object.map((mdata, key) => {
            const personMap = [];
            personMap["Gender"] = mdata.Gender;
            personMap["HeightCm"] = mdata.HeightCm;
            personMap["WeightKg"] = mdata.WeightKg;
            const heiginm = mdata.HeightCm/100;
            const heigmsqu = heiginm* heiginm;
            const bmical = mdata.WeightKg / heigmsqu;
        
            if(bmical <= 18.4){
                personMap["BMICategory"] = "Underweight";
                personMap["HealthRisk"] = "Malnutrition risk";
            }else if(bmical > 18.5 && bmical < 24.9){
                personMap["BMICategory"] = "Normal weight";
                personMap["HealthRisk"] = "Low risk";
            }else if(bmical > 25 && bmical < 29.9){
                personMap["BMICategory"] = "Overweight";
                personMap["HealthRisk"] = "Enhanced risk";
                overweightcount++;
            }else if(bmical > 30 && bmical < 34.9){
                personMap["BMICategory"] = "Moderately obese"; 
                personMap["HealthRisk"] = "Medium risk"; 
            } else if(bmical > 35 && bmical < 39.9){
                personMap["BMICategory"] = "Severely obese";
                personMap["HealthRisk"] = "High risk";
            } else if(bmical >= 40){
                personMap["BMICategory"] = "Very Severely obese";
                personMap["HealthRisk"] = "Very High risk";
            }

        allData.push(personMap);
        });
    console.log(allData);
    console.log('Overweight count :: => '+overweightcount);
    }
  })
  .on('dataError', error => {
    // a syntax error was found in the JSON
    console.log("JSON File is not readable");
  })
  .on('error', error => {
    // some kind of operational error occurred
    console.log(error);
  })
  .on('end', error => {
    // finished processing the stream
    console.log("JSON parse completed");
  })