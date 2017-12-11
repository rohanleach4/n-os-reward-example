# N-OS Reward a worker example
## Overview

A node.js example of how an N-OS (non organic stimuli) or an AI could be rewarded for a task completed.

## Brief 
This is a _very_ simple N-OS POC.
To make this POC quick and simple and for everyone, there are no databases used.
It exists to demonstrate the concept of N-OS and a Sentinel can reward one of its workers with a token.
The concept of rewarding digital entities is important for the growth of decentralisation, Blockchain, AI
and N-OS.

### Reward is a key, conceptual enabler.
The end goal is to allow a device to pay for is own use, whether that be a car paying for its own fuel
or a web app paying for its own hosting.

## Example
This example consists of one node, containing 3 workers carrying out a simple task.
In this instance, the task is just a loop. Each worker has the loop written differently,
but achieves the same output. Once the task is completed, it writes how long it takes to complete its
_time sheet_.
The workers timesheet's are the Sentinel's environment and it is constantly watching for it to change.
This is the only law of N-OS. It must respond to a change in its environment.
Once it registers a change, it grabs the values stored in the time sheets and finds out which is fastest.
The fastest one is rewarded by adding a fake token to winning workers wallet.

### To run
- clone the repro
- cd into the directory
- npm install
- node sentinel.js
