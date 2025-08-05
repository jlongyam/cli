import Enquirer from 'enquirer';

const { Confirm } = Enquirer;
const prompt = new Confirm({
  name: 'question',
  message: 'Did you like enquirer?'
});

prompt.run()
  .then(answer => console.log('Answer:', answer));