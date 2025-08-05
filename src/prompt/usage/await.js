import Enquirer from 'enquirer';

const { prompt } = Enquirer;
const questions = [{
  type: 'input',
  name: 'username',
  message: 'What is your username?'
}, {
  type: 'password',
  name: 'password',
  message: 'What is your password?'
}];
const answers = await prompt(questions);

console.clear()
console.log(answers);