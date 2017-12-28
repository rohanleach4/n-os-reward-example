// simple node script to measure how long a process takes
var fs = require('fs');
function timesheet() {
  var startTime = process.hrtime();

  // process starts
  var x = Array.apply(null, { length: 200 })
    .map(function(key, val) {
      val++;
      return val;
    })
    .join();
  console.log(x);
  // process ends

  var timeTaken = parseHrtimeToSeconds(process.hrtime(startTime));
  console.log('process has taken ' + timeTaken + 'seconds');

  fs.writeFile('./worker3/worker3_timesheet.txt', timeTaken, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}

function parseHrtimeToSeconds(hrtime) {
  var seconds = (hrtime[0] + hrtime[1] / 1e9).toFixed(10);
  return seconds;
}
timesheet();
