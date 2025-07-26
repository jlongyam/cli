import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };

export default [
	{
		input: './src/args.js',
		output: [{
			file: pkg['exports']['.']['import'],
			format: 'es',
			inlineDynamicImports: true
		}, {
			file: pkg['exports']['.']['require'],
			format: 'cjs'
		}],
		plugins: [
			resolve(),
			commonjs()
		]
	}
];
