import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };

export default [
	{
		input: pkg.main,
		output: {
			file: pkg.exports.import,
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