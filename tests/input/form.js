import { input } from '../../src/input.js';

let result = await input.form({
  key: 'data',
  question: 'Please provide the following information:',
  field: [
    { name: 'package', message: 'Package name', initial: 'test' },
    { name: 'version', message: 'Version', initial: '1.0.0' },
    { name: 'main', message: 'Main script', initial: 'index.js' },
    { name: 'type', message: 'Script type', initial: 'module' }
  ]
});

console.table(result.data);
