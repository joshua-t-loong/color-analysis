var fs = require('fs');
var Vibrant = require('node-vibrant');
var color   = require('dominant-color');
var csvjson = require('csvjson');
var path    = require('path');
var data = fs.readFileSync(path.join(__dirname, 'info.csv'), { encoding : 'utf8'});
var options = {
  delimiter : ',' // optional
};
var dataset = csvjson.toObject(data, options);
var colors, colorsArray = [], count = 0;

for (var i = 0; i < dataset.length; i++){
  var v = new Vibrant('img/' + dataset[i].file);
  v.getPalette(function(e, s) {
    if (e) {
      console.log(e);
    }
    else {
     colors = JSON.stringify(s,null,2);
     colorsArray.push(colors);
    }
  });
}

setTimeout(loadData, 10000, colorsArray);


function loadData (colors)
{
  fs.writeFile("./colors.json", colors, function(err) {
    if(err) {
     return console.log(err);
     }
   console.log("The file was saved!");
  });
}
