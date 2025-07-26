const { default: Parse } = await import('../node_modules/args-parser/parse.js');

export const args = Parse(process.argv);