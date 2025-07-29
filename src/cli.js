import { args } from './args.js';
import { input } from './input.js';
import { fs } from './fs.js';

/**
 * # cli
 *
 * Export module's command-line args-parser, input utilities, and file system operations.
 *
 * @module cli
 * @returns {Object} - Modules
 *
 * @example
 * import { args, input, fs } from "@jlongyam/cli";
 *
 * console.log(Object.getOwnPropertyNames(args));   // []
 * console.log(Object.getOwnPropertyNames(input));  // [ 'ask', 'asks' ]
 * console.log(Object.getOwnPropertyNames(fs));     // [ 'readFile', 'writeFile', ... ]
 *
 * // Use file system operations
 * const content = await fs.readFile('./config.json');
 * await fs.writeFile('./output.txt', 'Hello World');
 */
export {
  args,
  input,
  fs
}