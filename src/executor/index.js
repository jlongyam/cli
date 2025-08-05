import { exec, spawn } from 'child_process';
import os from 'os';

class AppExecutor {
  constructor(options = {}) {
    this.logger = options.logger || console;
    this.safeMode = options.safeMode || false;
  }

  /**
   * Execute a shell command
   * @param {string} command - The command to execute
   * @param {object} options - Options for execution
   * @returns {Promise<{stdout: string, stderr: string, code: number}>}
   */
  async executeCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      const execOptions = {
        cwd: options.cwd || process.cwd(),
        env: options.env || process.env,
        shell: options.shell || true,
        ...options
      };

      if (this.safeMode) {
        this.logger.warn('Safe mode enabled - command execution is disabled');
        return resolve({
          stdout: '',
          stderr: 'Command execution disabled in safe mode',
          code: 0
        });
      }

      const child = exec(command, execOptions, (error, stdout, stderr) => {
        if (error) {
          if (options.ignoreErrors) {
            resolve({ stdout, stderr, code: error.code || 1 });
          } else {
            reject(error);
          }
        } else {
          resolve({ stdout, stderr, code: 0 });
        }
      });

      if (options.timeout) {
        setTimeout(() => {
          child.kill();
          reject(new Error(`Command timed out after ${options.timeout}ms`));
        }, options.timeout);
      }
    });
  }

  /**
   * Open a file with the default application
   * @param {string} filePath - Path to the file
   * @param {object} options - Options for opening
   * @returns {Promise<{stdout: string, stderr: string, code: number}>}
   */
  async openFile(filePath, options = {}) {
    let command;
    const platform = os.platform();

    if (platform === 'darwin') {
      command = `open "${filePath}"`;
    } else if (platform === 'win32') {
      command = `start "" "${filePath}"`;
    } else {
      // Linux and others
      command = `xdg-open "${filePath}"`;
    }

    return this.executeCommand(command, options);
  }

  /**
   * Open a file with a specific application
   * @param {string} filePath - Path to the file
   * @param {string} appPath - Path to the application executable
   * @param {object} options - Options for opening
   * @returns {Promise<{stdout: string, stderr: string, code: number}>}
   */
  async openWith(filePath, appPath, options = {}) {
    let command;
    const platform = os.platform();

    if (platform === 'darwin') {
      command = `open -a "${appPath}" "${filePath}"`;
    } else if (platform === 'win32') {
      command = `"${appPath}" "${filePath}"`;
    } else {
      // Linux and others
      command = `"${appPath}" "${filePath}"`;
    }

    return this.executeCommand(command, options);
  }

  /**
   * Launch an application
   * @param {string} appPath - Path to the application executable
   * @param {Array<string>} args - Arguments to pass to the application
   * @param {object} options - Options for launching
   * @returns {Promise<{stdout: string, stderr: string, code: number}>}
   */
  async launchApp(appPath, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      if (this.safeMode) {
        this.logger.warn('Safe mode enabled - application launch is disabled');
        return resolve({
          stdout: '',
          stderr: 'Application launch disabled in safe mode',
          code: 0
        });
      }

      const spawnOptions = {
        cwd: options.cwd || process.cwd(),
        env: options.env || process.env,
        detached: options.detached || false,
        stdio: options.stdio || 'ignore',
        ...options
      };

      const child = spawn(appPath, args, spawnOptions);

      let stdout = '';
      let stderr = '';

      if (child.stdout) {
        child.stdout.on('data', (data) => {
          stdout += data.toString();
        });
      }

      if (child.stderr) {
        child.stderr.on('data', (data) => {
          stderr += data.toString();
        });
      }

      child.on('close', (code) => {
        if (code === 0 || options.ignoreErrors) {
          resolve({ stdout, stderr, code });
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });

      if (options.detached) {
        child.unref();
      }

      if (options.timeout) {
        setTimeout(() => {
          child.kill();
          reject(new Error(`Process timed out after ${options.timeout}ms`));
        }, options.timeout);
      }
    });
  }

  /**
   * Get the default command for opening files based on platform
   * @returns {string}
   */
  getDefaultOpenCommand() {
    const platform = os.platform();
    if (platform === 'darwin') return 'open';
    if (platform === 'win32') return 'start';
    return 'xdg-open';
  }
}

export default AppExecutor;