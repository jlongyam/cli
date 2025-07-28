import { input } from '../../src/input.js';

let result = await input.password({
  key: 'pass',
  question: 'your password:',
});

console.log(result.pass);