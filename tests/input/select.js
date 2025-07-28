import { input } from '../../src/input.js';

let result = await input.select({
  key: 'word',
  question: 'choose one: ',
  option: ['one', 'two', 'three', 'four']
});

console.log(result.word);