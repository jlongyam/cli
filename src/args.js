const { default: Parse } = await import('../node_modules/args-parser/parse.js');

/**
 * ## args
 * Command-line arguments parser.
 * @module cli/args
 * @returns {Object} - Arguments 
 * @example
 * import { args } from "@jlongyam/cli";
 * 
 * if( Object.keys(args).length === 0 ) {
 *   console.log('no arguments')
 * } else {
 *   console.log(args)
 * }
 */
export const args = Parse(process.argv);