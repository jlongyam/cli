import { input } from "../../src/input.js";

let result = await input.ask({
  key: 'name',
  question: 'what is your name'
});

console.log(result.name);