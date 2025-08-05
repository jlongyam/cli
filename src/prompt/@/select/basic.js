import Enquirer from 'enquirer';

const { Select } = Enquirer;
const prompt = new Select({
  name: 'color',
  message: 'Pick a flavor',
  choices: ['apple', 'grape', 'watermelon', 'cherry', 'orange']
});

console.clear();
prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);