// simple node script to measure how long a process takes
var fs = require('fs');
function timesheet() {
  var startTime = process.hrtime();

  // process starts
  for (f = 0; f <= 200; f++) {
    console.log(f);
  }
  // process ends

  var timeTaken = parseHrtimeToSeconds(process.hrtime(startTime));
  console.log('process has taken ' + timeTaken + 'seconds');

  fs.writeFile('./worker1/worker1_timesheet.txt', timeTaken, function(err) {
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
