import enquirer from 'enquirer';
const { Toggle } = enquirer;

const toggle = new Toggle({
  message: 'Activate?',
  enabled: 'Yep',
  disabled: 'Nope'
});

toggle.run().then(answer => {
  console.log(answer)
}).catch(console.error)