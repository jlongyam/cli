const { default: Parse } = await import('../node_modules/args-parser/parse.js');
/**
 * Imports the Parse function from the args-parser module and exports the parsed command-line arguments as an optional 'args' constant.
 * @example
 * if(Object.keys(args).length === 0) {
 *   console.log('no arguments')
 * } else {
 *   console.log(args)
 * }
 */
export const args = Parse(process.argv);