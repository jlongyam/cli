import Enquirer from 'enquirer';

const { Input } = Enquirer;
const prompt = new Input({
  name: 'username',
  message: 'What is your username?'
});

console.clear();
prompt.run()
  .then(answer => console.log('Username:', answer))
  .catch(console.error);