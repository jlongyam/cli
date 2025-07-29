# File System Module Usage Examples

The `@jlongyam/cli` file system module provides a comprehensive, promise-based API for file system operations in Node.js applications.

## Installation and Import

```javascript
import { fs } from "@jlongyam/cli";
// Or import individual functions
import { readFile, writeFile, createDirectory } from "@jlongyam/cli";
```

## Basic File Operations

### Reading Files

```javascript
// Read text file
const content = await fs.readFile('./config.json');
console.log(content);

// Read binary file as buffer
const buffer = await fs.readFile('./image.png', null);
console.log(`Image size: ${buffer.length} bytes`);

// Read with specific encoding
const content = await fs.readFile('./data.txt', 'utf16le');
```

### Writing Files

```javascript
// Write text content
await fs.writeFile('./output.txt', 'Hello, World!');

// Write JSON data
const data = { name: 'John', age: 30 };
await fs.writeFile('./user.json', JSON.stringify(data, null, 2));

// Write binary data
const buffer = Buffer.from('Binary content');
await fs.writeFile('./binary.dat', buffer);
```

### Appending to Files

```javascript
// Append to log file
await fs.appendFile('./app.log', `${new Date().toISOString()} - Application started\n`);

// Append JSON entries
const logEntry = { timestamp: Date.now(), event: 'user_login' };
await fs.appendFile('./events.jsonl', JSON.stringify(logEntry) + '\n');
```

## File Management

### Copying Files

```javascript
// Simple file copy
await fs.copyFile('./source.txt', './backup.txt');

// Copy with overwrite protection
import { constants } from 'fs';
await fs.copyFile('./source.txt', './backup.txt', constants.COPYFILE_EXCL);
```

### Moving/Renaming Files

```javascript
// Rename file
await fs.moveFile('./old-name.txt', './new-name.txt');

// Move to different directory
await fs.moveFile('./temp/file.txt', './archive/file.txt');
```

### Deleting Files

```javascript
// Delete single file
await fs.deleteFile('./temp.txt');

// Check if file exists before deleting
if (await fs.fileExists('./optional-file.txt')) {
  await fs.deleteFile('./optional-file.txt');
}
```

### File Information

```javascript
// Check if file exists
const exists = await fs.fileExists('./config.json');
if (exists) {
  console.log('Config file found');
}

// Get file statistics
const stats = await fs.getStats('./document.pdf');
console.log(`File size: ${stats.size} bytes`);
console.log(`Last modified: ${stats.mtime}`);
console.log(`Is file: ${stats.isFile()}`);
console.log(`Is directory: ${stats.isDirectory()}`);
```

## Directory Operations

### Creating Directories

```javascript
// Create single directory
await fs.createDirectory('./new-folder');

// Create nested directories
await fs.createDirectory('./path/to/nested/folder', true);

// Create directory only if it doesn't exist
if (!(await fs.directoryExists('./optional-dir'))) {
  await fs.createDirectory('./optional-dir');
}
```

### Listing Directory Contents

```javascript
// Simple directory listing
const files = await fs.listDirectory('./src');
console.log('Files:', files);

// Get detailed file information
const entries = await fs.listDirectory('./src', { withFileTypes: true });
entries.forEach(entry => {
  console.log(`${entry.name} - ${entry.isFile() ? 'File' : 'Directory'}`);
});

// Recursive directory listing
const allFiles = await fs.listDirectory('./project', { recursive: true });
console.log('All files in project:', allFiles);
```

### Removing Directories

```javascript
// Remove empty directory
await fs.removeDirectory('./empty-folder');

// Remove directory and all contents
await fs.removeDirectory('./temp-folder', true);
```

## Path Utilities

### Path Resolution and Manipulation

```javascript
// Resolve absolute path
const absolutePath = fs.resolvePath('./src', '../lib', 'utils.js');
console.log('Absolute path:', absolutePath);

// Join path segments
const configPath = fs.joinPath(process.cwd(), 'config', 'app.json');

// Normalize path
const normalized = fs.normalizePath('./src/../lib/./utils.js');
console.log('Normalized:', normalized); // lib/utils.js

// Get relative path
const relative = fs.relativePath('/project/src', '/project/lib/utils.js');
console.log('Relative path:', relative); // ../lib/utils.js
```

## Advanced Features

### File Watching

```javascript
// Watch file for changes
const watcher = fs.watchFile('./config.json', (eventType, filename) => {
  console.log(`Config file ${eventType}: ${filename}`);
  if (eventType === 'change') {
    // Reload configuration
    loadConfig();
  }
});

// Stop watching
setTimeout(() => {
  watcher.close();
}, 60000); // Stop after 1 minute
```

### Searching Files

```javascript
// Find all JavaScript files
const jsFiles = await fs.searchFiles('./src', /\.js$/);
console.log('JavaScript files:', jsFiles);

// Find configuration files (glob pattern)
const configFiles = await fs.searchFiles('.', '*config*');
console.log('Config files:', configFiles);

// Search in current directory only (non-recursive)
const localFiles = await fs.searchFiles('./src', /\.ts$/, { recursive: false });

// Include directories in search results
const allEntries = await fs.searchFiles('./src', /^test/, { 
  includeDirectories: true 
});
```

### Batch Operations

```javascript
// Perform multiple operations atomically
const operations = [
  { type: 'write', path: './temp/file1.txt', content: 'Content 1' },
  { type: 'write', path: './temp/file2.txt', content: 'Content 2' },
  { type: 'copy', source: './template.txt', destination: './temp/template-copy.txt' },
  { type: 'mkdir', path: './temp/subfolder', recursive: true }
];

const results = await fs.batchOperation(operations);

// Check results
results.forEach((result, index) => {
  if (result.success) {
    console.log(`Operation ${index + 1} succeeded`);
  } else {
    console.error(`Operation ${index + 1} failed:`, result.error.message);
  }
});
```

## Error Handling

### Custom Error Handling

```javascript
import { fs, FileSystemError } from "@jlongyam/cli";

try {
  const content = await fs.readFile('./nonexistent.txt');
} catch (error) {
  if (error instanceof FileSystemError) {
    console.error(`File system error: ${error.message}`);
    console.error(`Error code: ${error.code}`);
    console.error(`Path: ${error.path}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Graceful Error Handling

```javascript
// Safe file reading with fallback
async function readConfigSafely(configPath, defaultConfig = {}) {
  try {
    const content = await fs.readFile(configPath);
    return JSON.parse(content);
  } catch (error) {
    if (error instanceof FileSystemError && error.code === 'ENOENT') {
      console.log('Config file not found, using defaults');
      return defaultConfig;
    }
    throw error; // Re-throw unexpected errors
  }
}

const config = await readConfigSafely('./config.json', { 
  port: 3000, 
  host: 'localhost' 
});
```

## Real-World Examples

### Project Setup Script

```javascript
import { fs } from "@jlongyam/cli";

async function setupProject(projectName) {
  const projectPath = fs.joinPath(process.cwd(), projectName);
  
  // Create project structure
  await fs.createDirectory(projectPath);
  await fs.createDirectory(fs.joinPath(projectPath, 'src'));
  await fs.createDirectory(fs.joinPath(projectPath, 'tests'));
  await fs.createDirectory(fs.joinPath(projectPath, 'docs'));
  
  // Create package.json
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: '',
    main: 'src/index.js',
    scripts: {
      test: 'vitest',
      start: 'node src/index.js'
    }
  };
  
  await fs.writeFile(
    fs.joinPath(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // Create initial files
  await fs.writeFile(
    fs.joinPath(projectPath, 'src', 'index.js'),
    'console.log("Hello, World!");'
  );
  
  await fs.writeFile(
    fs.joinPath(projectPath, 'README.md'),
    `# ${projectName}\n\nProject description goes here.`
  );
  
  console.log(`Project ${projectName} created successfully!`);
}

// Usage
await setupProject('my-new-project');
```

### Log File Manager

```javascript
import { fs } from "@jlongyam/cli";

class LogManager {
  constructor(logDir = './logs') {
    this.logDir = logDir;
  }
  
  async init() {
    await fs.createDirectory(this.logDir);
  }
  
  async log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
    
    const logFile = fs.joinPath(
      this.logDir, 
      `${new Date().toISOString().split('T')[0]}.log`
    );
    
    await fs.appendFile(logFile, logEntry);
  }
  
  async getLogFiles() {
    return await fs.searchFiles(this.logDir, /\.log$/);
  }
  
  async cleanOldLogs(daysToKeep = 7) {
    const logFiles = await this.getLogFiles();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    for (const logFile of logFiles) {
      const fullPath = fs.joinPath(this.logDir, logFile);
      const stats = await fs.getStats(fullPath);
      
      if (stats.mtime < cutoffDate) {
        await fs.deleteFile(fullPath);
        console.log(`Deleted old log file: ${logFile}`);
      }
    }
  }
}

// Usage
const logger = new LogManager();
await logger.init();
await logger.log('info', 'Application started');
await logger.log('error', 'Something went wrong');
await logger.cleanOldLogs(30); // Keep logs for 30 days
```

### Configuration Manager

```javascript
import { fs } from "@jlongyam/cli";

class ConfigManager {
  constructor(configPath = './config.json') {
    this.configPath = configPath;
    this.config = {};
    this.watcher = null;
  }
  
  async load() {
    try {
      const content = await fs.readFile(this.configPath);
      this.config = JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Create default config if file doesn't exist
        this.config = this.getDefaultConfig();
        await this.save();
      } else {
        throw error;
      }
    }
  }
  
  async save() {
    await fs.writeFile(
      this.configPath, 
      JSON.stringify(this.config, null, 2)
    );
  }
  
  get(key, defaultValue = null) {
    return key.split('.').reduce((obj, k) => obj?.[k], this.config) ?? defaultValue;
  }
  
  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, k) => {
      if (!(k in obj)) obj[k] = {};
      return obj[k];
    }, this.config);
    
    target[lastKey] = value;
  }
  
  startWatching(callback) {
    this.watcher = fs.watchFile(this.configPath, async (eventType) => {
      if (eventType === 'change') {
        await this.load();
        callback?.(this.config);
      }
    });
  }
  
  stopWatching() {
    this.watcher?.close();
  }
  
  getDefaultConfig() {
    return {
      app: {
        name: 'My App',
        version: '1.0.0',
        port: 3000
      },
      database: {
        host: 'localhost',
        port: 5432
      }
    };
  }
}

// Usage
const config = new ConfigManager();
await config.load();

console.log('App name:', config.get('app.name'));
config.set('app.port', 8080);
await config.save();

// Watch for config changes
config.startWatching((newConfig) => {
  console.log('Configuration updated:', newConfig);
});
```

## Best Practices

1. **Always use try-catch blocks** for file operations in production code
2. **Check file existence** before performing operations when appropriate
3. **Use absolute paths** when possible to avoid path resolution issues
4. **Clean up watchers** when they're no longer needed
5. **Use batch operations** for multiple related file operations
6. **Validate input paths** before passing them to file system functions
7. **Handle different error codes** appropriately (ENOENT, EACCES, etc.)
8. **Use appropriate encodings** for different file types
9. **Create directories recursively** when creating nested structures
10. **Use path utilities** instead of string concatenation for cross-platform compatibility

## Performance Tips

- Use `fs.batchOperation()` for multiple related operations
- Use `fs.searchFiles()` with specific patterns instead of listing all files
- Consider using streams for large files (not covered in this basic API)
- Cache file stats when performing multiple checks on the same files
- Use `recursive: false` in `listDirectory()` when you don't need nested files