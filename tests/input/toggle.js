import { input } from '../../src/input.js';

let result = await input.toggle({
  key: 'toggle',
  question: 'switch option',
  enable: 'on',
  disable: 'off'
});

console.log(result.toggle)