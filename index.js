var fs = require('fs');
var Vibrant = require('node-vibrant');
var csvjson = require('csvjson');
var path    = require('path');
var data = fs.readFileSync(path.join(__dirname, 'info.csv'), { encoding : 'utf8'});
var options = {
  delimiter : ',' // optional
};
var dataset = csvjson.toObject(data, options);
var colors = {};

for (var i = 0; i < dataset.length; i++){
  var v = new Vibrant('img/' + dataset[i].file)
  v.getPalette(function(e, s) {
  if (e) {
    console.log(e)
  } else {

    colors = JSON.stringify(s, null, 2);
    for (var i = 0; i < dataset.length; i++){
      console.log(dataset[i].file);
      console.log(colors[i] +"\n");

    }
  }
})
}
