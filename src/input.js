import Enquirer from "enquirer";

const enquirer = new Enquirer();

/**
 * ### input.ask
 * 
 * Prompts the user for input using the enquirer library.
 *
 * @module cli/input/ask
 * @param {Object} option - Contains the key and question for the prompt.
 * @returns {Promise<Object>} The user's response.
 * 
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * let result = await input.ask({
 *   key: 'name',
 *   question: 'what is your name'
 * });
 * 
 * console.log(result.name);
 */
async function ask(option) {
  const response = await enquirer.prompt({
    type: 'input',
    name: option.key,
    message: option.question
  });
  return response
}

/**
 * ### input.password
 * 
 * Prompts the user for a password input using Enquirer.
 *
 * @module cli/input/password
 * @param {Object} option - Configuration object containing the prompt key and question.
 * @param {string} option.key - The key for the response.
 * @param {string} option.question - The message to display to the user.
 * @returns {Promise<Object>} The response object with the entered password.
 * 
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * let result = await input.password({
 *   key: 'pass',
 *   question: 'your password:',
 * });
 * 
 * console.log(result.pass);
 */
async function password(option) {
  const response = await enquirer.prompt({
    type: 'password',
    name: option.key,
    message: option.question
  });
  return response
}

/**
 * ### input.suggest
 * 
 * Prompts the user for input using Enquirer with the provided option configuration.
 *
 * @module cli/input/suggest
 * @param {Object} option - Configuration object containing key, placeholder, and question.
 * @param {string} option.key - The key for the response.
 * @param {string} option.question - The message to display to the user.
 * @param {string} option.placeholder - The answer placeholder to display to the user.
 * @returns {Promise<Object>} The user's input response.
 * 
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * let result = await input.suggest({
 *   key: 'language',
 *   question: 'primary language',
 *   placeholder: 'english'
 * });
 * 
 * console.log(result.language)
 */
async function suggest(option) {
  const response = await enquirer.prompt({
    type: 'input',
    name: option.key,
    message: option.question,
    initial: option.placeholder
  });
  return response
}

/**
 * ### input.confirm
 * 
 * Prompts the user with a confirmation question using Enquirer.
 *
 * @module cli/input/confirm
 * @param {Object} option - Contains the key and question for the prompt.
 * @param {string} option.key - The key for the response.
 * @param {string} option.question - The message to display to the user.
 * @returns {Promise<Object>} The user's response.
 * 
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * let result = await input.confirm({
 *   key: 'ok',
 *   question: 'are you agree with this'
 * });
 * 
 * if(result.ok) {
 *   console.log('good choise')
 * } else {
 *   console.log('too bad')
 * }
 */
async function confirm(option) {
  const response = await enquirer.prompt({
    type: 'confirm',
    name: option.key,
    message: option.question
  });
  return response
}

/**
 * ### input.select
 * 
 * Prompts the user with a select menu using Enquirer and logs the selected response.
 * 
 * @module cli/input/select
 * @param {Object} option - Configuration object containing the prompt details.
 * @param {string} option.key - The key for the response.
 * @param {string} option.question - The message to display to the user.
 * @param {Array} option.option - The list of selectable choices.
 * @returns {Promise<Object>}
 * 
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * let result = await input.select({
 *   key: 'word',
 *   question: 'choose one: ',
 *   option: ['one', 'two', 'three', 'four']
 * });
 * 
 * console.log(result.word);
 */
async function select(option) {
  const response = await enquirer.prompt({
    type: 'select',
    name: option.key,
    message: option.question,
    choices: option.option
  });
  return response
}

/**
 * ## input
 * 
 * Prompts user input using several of methods.
 * 
 * @module cli/input
 * @return {Object} - Namespace
 * 
 * @example
 * import { input } from "@jlongyam/cli";
 * 
 * console.log(Object.getOwnPropertyNames(input));
 */
export const input = {
  ask: ask,
  password: password,
  suggest: suggest,
  confirm: confirm,
  select: select
};
