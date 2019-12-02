"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("./TB Medium/m8/monitor.json");
let student = JSON.parse(rawdata);

var count = Object.keys(student).length;
var max = student[1].memory;
var novo2 = [];
for (i = 0; i < count; i++) {
    if (student[i].memory > max){
        max = student[i].memory;
    }
  var delay = (student[i].memory)/1024;
  novo2[i] = { delay: delay };

}
function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    var myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}
// Split in group of 3 items
var split = count / 32;
var result = chunkArray(novo2, split);

// Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]

var means = [];
//console.log( result[0][0].delay);
for (var i = 1; i < 30; i++) {
  var tempMean = 0;
  for (var k = 0; k < split - 1; k++) {
    tempMean = tempMean + result[i][k].delay;
  }

  means[i] = tempMean / split;
}

var mean = 0;
for (var i = 1; i < 30; i++) {
  mean = mean + means[i];
}
mean = mean / 30;

var dptemp = 0;
for (var i = 2; i < 30; i++) {
  var store = (mean - means[i]) * (mean - means[i]);
 
  dptemp += store;
}

var dp = dptemp / 32;
var ie = mean - 1.96 * (dp / Math.sqrt(30));
console.log("INTERVALO = " + ie);
console.log("Média CPU = " + mean);
console.log("dp"+dptemp);
console.log("Maximo:" + max/1024);
var ind = Math.round(split *2);
var tempo1 = student[ind].timestamp;
var tempo2 = student[count - 1].timestamp;
var tempo = tempo2 - tempo1;
console.log("Tempo de experimento= " + tempo);
/* RAM */
