import Enquirer from 'enquirer';

const { Select } = Enquirer;
const prompt = new Select({
  name: 'color',
  message: 'Pick a color',
  choices: [
    { message: 'Primary', name: 'cyan', value: '#00ffff' },
    { message: 'Secondary', name: 'black', value: '#000000' },
    { message: 'Default', name: 'blue', value: '#0000ff' },
  ],
  result(name) {
    return this.map(name)
  }
});

console.clear();
prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);