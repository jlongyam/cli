import Enquirer from 'enquirer';

const { prompt } = Enquirer;
const response = await prompt([{
  type: 'input',
  name: 'name',
  message: 'What is your name?'
}, {
  type: 'input',
  name: 'alias',
  message: 'What is your alias?'
}]);

console.clear();
console.log(response);