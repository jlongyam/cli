const { default: Enquirer } = await import('../node_modules/enquirer/index.js');

const enquirer = new Enquirer();

/**
 * ### input.asks
 * Prompts the user with an input question and logs the response.
 * @module cli/input/ask
 * @param {Array} options - An array of objects, each containing a 'key' and 'question' property.
 * @returns {Promise<void>} Object logs
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * input.ask([{
 *   key: 'name',
 *   question: 'What is your other name?'
 * }]);
 */
async function ask(options) {
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

/**
 * ## input
 * Prompts user input using several of methods.
 * @module cli/input
 * @return {Object} - Namespace
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * console.log(Object.getOwnPropertyNames(input));
 */
export const input = {
  ask: ask
};
