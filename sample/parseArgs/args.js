import parseArgs from "../../src/parseArgs.js";

let args = parseArgs()

console.log(args);
console.log('length: '+Object.keys(args).length)