var WatchJS = require("watchjs");
let fs = require("fs");
let exec = require("child_process").exec,
  child;
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

/**
 * This sentinal initiates all of the workers
 *
 *
 */

let path = require("path");

let worker1 = "./worker1/worker1.js";
let worker1_timesheet = "./worker1/worker1_timesheet.txt";
let worker2 = "./worker2/worker2.js";
let worker2_timesheet = "./worker2/worker2_timesheet.txt";
let worker3 = "./worker3/worker3.js";
let worker3_timesheet = "./worker3/worker3_timesheet.txt";
let workerData1 = {};
let workerData2 = {};
let workerData3 = {};
var compileData = {
  worker1: 0,
  worker2: 0,
  worker3: 0
};

/**
 * The next code block is just there to initialize the 3 workers in this example
 * In a 'real world' example, this block may not need to exist as the workers could be on
 * different servers or initiated by other means
 * An alternate method to run the workers here would be to delete this block and initiate
 * them is 3 seperate console tabs. This is just easier.
 *
 *
 */

child = exec("node " + worker1, function(error) {
  if (error !== null) {
    console.log("exec error ouch: " + error);
  } else {
    console.log("success worker1 has been executed");
  }
});

child = exec("node " + worker2, function(error) {
  if (error !== null) {
    console.log("exec error ouch: " + error);
  } else {
    console.log("success worker2 has been executed");
  }
});

child = exec("node " + worker3, function(error) {
  if (error !== null) {
    console.log("exec error ouch: " + error);
  } else {
    console.log("success worker3 has been executed");
  }
});

/**
 * This is where the Sentinel watches for changes in its environment
 * In this case, the Sentinel's environment is the workers timesheets
 * When it detects a change, it grabs the value of the timesheet, ie. how
 * lonf it took to process the script and stores the timesheet name and value
 * in the compileData object.
 *
 */

fs.watch(worker1_timesheet, function(event, filename) {
  if (filename) {
    fs.readFile(worker1_timesheet, "utf8", function(err, workerData1) {
      if (err) {
        throw err;
      }
      compileData.worker1 = Number(workerData1);
    });
  } else {
    console.log("There has been an error with the worker1_timesheet");
  }
});

fs.watch(worker2_timesheet, function(event, filename) {
  if (filename) {
    fs.readFile(worker2_timesheet, "utf8", function(err, workerData2) {
      if (err) {
        throw err;
      }
      compileData.worker2 = Number(workerData2);
    });
  } else {
    console.log("There has been an error with the worker2_timesheet");
  }
});

fs.watch(worker3_timesheet, function(event, filename) {
  if (filename) {
    fs.readFile(worker3_timesheet, "utf8", function(err, workerData3) {
      if (err) {
        throw err;
      }
      compileData.worker3 = Number(workerData3);
    });
  } else {
    console.log("There has been an error with the worker3_timesheet");
  }
});

/**
 * Here the Sentinel watches for a change in the compileData object (its second environment)
 * Once it detects a change in the object, it calculates which is faster and awards the 'winner'
 * a token. This token could be anything, but I hope that the reward will be a crypto token/coin.
 *
 * Now scale this concept to dozens/hundreds of nodes, all carrying out specific tasks, all with reward
 * and we have an interesting N-OS that exists due to its own merits
 *
 */

watch(compileData, function() {
  if (compileData.worker1 && compileData.worker2 && compileData.worker3 > 0) {
    var min = Math.min.apply(
      null,
      Object.keys(compileData).map(function(x) {
        return compileData[x];
      })
    );
    var theWinner = Object.keys(compileData).filter(function(x) {
      return compileData[x] == min;
    })[0];
    console.log(theWinner + " is the winner " + min);
    // write a token in the fastest workers wallet
    fs.writeFile("./" + theWinner + "/wallet.txt", "1 token", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The token was saved in the workers wallet");
    });
  }
});
