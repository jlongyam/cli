import { args } from "../src/args.js";

if( Object.keys(args).length === 0 ) {
  console.log('no arguments')
} else {
  console.log(args)
}