import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };

export default [
	{
		input: './src/args.js',
		output: {
			file: pkg.main,
			format: 'es',
			inlineDynamicImports: true
		},
		plugins: [
			json(),
			resolve(),
			commonjs()
		]
	}
];