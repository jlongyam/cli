import enquirer from 'enquirer';
const { Input } = enquirer;
let x = undefined;
const prompt = await new Input({
  message: 'What is your username?',
  initial: 'jonschlinkert',
  result: function(answer) {
    //console.log(answer)
    x = answer
  }
});

await prompt.run()
//   .then(answer => console.log('Answer:', answer))
//   .catch(console.log);
//console.log(await prompt.run())
console.log(x)