import { input } from "../../src/input.js";

let result = await input.confirm({
  key: 'ok',
  question: 'are you agree with this'
});

if(result.ok) {
  console.log('good choise')
} else {
  console.log('too bad')
}