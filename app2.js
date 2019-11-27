'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('jsonnew.json');
let student = JSON.parse(rawdata);

var count = Object.keys(student).length;

    function chunkArray(myArray, chunk_size){
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            var myChunk = myArray.slice(index, index+chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
    
        return tempArray;
    }
    // Split in group of 3 items
    var split = count/30 ;
    var result = chunkArray(student, split);
    console.log(result[0][0].cpu);
    console.log(count);
    // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
   