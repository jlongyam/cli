import { args } from './args.js';
import { input } from './input.js';

/**
 * # cli
 * 
 * Export module's command-line args-parser and input utilities.
 * 
 * @module cli
 * @returns {Object} - Modules
 * 
 * @example
 * import { args, input } from "@jlongyam/cli";
 * 
 * console.log(Object.getOwnPropertyNames(args));   // []
 * console.log(Object.getOwnPropertyNames(input));  // [ 'ask', 'asks' ]
 */
export {
  args,
  input
}