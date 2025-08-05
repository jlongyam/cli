import Enquirer from 'enquirer';

const { prompt } = Enquirer;

console.clear();
prompt({
  type: 'confirm',
  name: 'question',
  message: 'Did you like enquirer?'
})
  .then(answer => console.log('Answer:', answer));
