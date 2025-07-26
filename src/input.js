const { default: Enquirer } = await import('../node_modules/enquirer/index.js');

const enquirer = new Enquirer();
/**
 * Prompts the user with an input question using Enquirer and logs the response.
 *
 * @param {Object} option - Contains the prompt configuration.
 * @param {string} option.key - The key for the response object.
 * @param {string} option.question - The message to display to the user.
 */
async function ask(option) {
  const response = await enquirer.prompt({
    type: 'input',
    name: option.key,
    message: option.question
  });
  console.log(response);
}
/**
 * Prompts the user with a series of input questions based on the provided options array using Enquirer.
 *
 * @param {Array} options - An array of objects, each containing a 'key' and 'question' property for the prompt.
 * @returns {Promise<void>} Logs the user's responses to the console.
 */
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
