import { input } from '../../src/input.js';

let result = await input.suggest({
  key: 'language',
  question: 'primary language',
  placeholder: 'english'
});

console.log(result.language)