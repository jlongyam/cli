import AppExecutor from '../../src/executor/index.js';
import os from 'os';

const shell = new AppExecutor({
  logger: console,
  safeMode: false
});

async function executeCommandSimple(strCmd = 'echo "Hello"') {
  try {
    const result = await shell.executeCommand(strCmd);
    console.log(result.stdout.trim());
  } catch(error) {
    console.error('Error: ', error);
  }
}

async function executeCommandCrossEnv() {
  try {
    let result = '';
    if (os.platform() === 'win32') {
      result = await shell.executeCommand('dir');
    } else {
      result = await shell.executeCommand('ls -1a');
    }
    console.log(result.stdout.trim())
  } catch(error) {
    console.error('Error: ', error)
  }
}
export {
  executeCommandSimple,
  executeCommandCrossEnv
}
