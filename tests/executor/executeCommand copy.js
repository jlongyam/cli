const AppExecutor = require('./app-executor');

// Create an instance
const executor = new AppExecutor({
  logger: console,
  safeMode: false // Set to true to disable actual execution (for testing)
});

// Example usage
(async () => {
  try {
    // Execute a shell command
    const cmdResult = await executor.executeCommand('echo "Hello World"');
    console.log('Command result:', cmdResult.stdout);

    // Open a file with default application
    await executor.openFile('/path/to/document.pdf');

    // Open a file with specific application
    await executor.openWith(
      '/path/to/image.jpg',
      '/Applications/Preview.app' // or 'C:\\Program Files\\Photos\\Photos.exe' on Windows
    );

    // Launch an application
    await executor.launchApp('/Applications/Calculator.app', [], {
      detached: true
    });

    // Platform-specific example
    if (os.platform() === 'win32') {
      await executor.executeCommand('dir');
    } else {
      await executor.executeCommand('ls -la');
    }

  } catch (error) {
    console.error('Error:', error);
  }
})();