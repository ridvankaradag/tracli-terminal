#!/usr/bin/env node

const commands = require("../lib/commands");

const args = process.argv.splice(process.execArgv.length + 2);

/*
*
*
Commands: [list, create+, delete+], [start, pause, finish]
Examples: 
tracli create -p/-t | p for project name, t for task name
tracli delete -p/-t | p for project id, t for task id
tracli start/pause/finish -t, tracli pause -t, tracli finish -t | t for task id
tracli list/ -p=id | without parameter list all project/or all task for unique project
*
*/

// if (args.length > 1) {
//     console.log("Invalid commands");
//     return false;
// }else if (args.length === 0) {
//     console.log("Help Screen");
//     console.log("------------------");
//     return false;
// }

console.log(args);

commands.app(args);
