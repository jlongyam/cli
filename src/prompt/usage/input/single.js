import Enquirer from 'enquirer';

const { prompt } = Enquirer;
const response = await prompt({
  type: 'input',
  name: 'username',
  message: 'What is your username?'
});

console.clear();
console.log(response);