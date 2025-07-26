const { default: Enquirer } = await import('../node_modules/enquirer/index.js');

const enquirer = new Enquirer();

async function ask(option) {
  const response = await enquirer.prompt({
    type: 'input',
    name: option.key,
    message: option.question
  });
  console.log(response);
}

async function asks(options) {
  const response = await enquirer.prompt((function () {
    let arrayObject = [];
    options.forEach(function (option) {
      let eachObject = {
        type: 'input',
        name: option.key,
        message: option.question
      };
      arrayObject.push(eachObject);
    })
    return arrayObject
  }()));
  console.log(response);
}

export const input = {
  ask: ask,
  asks: asks
};
