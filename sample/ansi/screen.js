// import { screen } from "../../src/ansi/screen.js";
import { screen } from "../../src/ansi/index.js";

console.log('This will be cleared in 2 seconds...');
setTimeout(() => {
  process.stdout.write(screen.clear);
  console.log('Screen cleared!');
  //console.clear()
}, 2000);