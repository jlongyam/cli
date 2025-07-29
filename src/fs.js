import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

/**
 * Custom error class for file system operations
 */
class FileSystemError extends Error {
  constructor(message, code, path) {
    super(message);
    this.name = 'FileSystemError';
    this.code = code;
    this.path = path;
  }
}

/**
 * Validates if a path is provided and is a string
 * @param {string} filePath - The path to validate
 * @param {string} operation - The operation being performed (for error messages)
 * @throws {FileSystemError} If path is invalid
 */
function validatePath(filePath, operation) {
  if (!filePath || typeof filePath !== 'string') {
    throw new FileSystemError(
      `Invalid path provided for ${operation}: ${filePath}`,
      'INVALID_PATH',
      filePath
    );
  }
}

/**
 * Wraps file system operations with proper error handling
 * @param {Function} operation - The async operation to wrap
 * @param {string} operationName - Name of the operation for error messages
 * @param {string} filePath - The file path being operated on
 * @returns {Promise} The wrapped operation result
 */
async function wrapOperation(operation, operationName, filePath) {
  try {
    return await operation();
  } catch (error) {
    throw new FileSystemError(
      `Failed to ${operationName} '${filePath}': ${error.message}`,
      error.code || 'OPERATION_FAILED',
      filePath
    );
  }
}

/**
 * Read file contents
 * @param {string} filePath - Path to the file
 * @param {string|object} [options='utf8'] - Encoding or options object
 * @returns {Promise<string|Buffer>} File contents
 * 
 * @example
 * const content = await readFile('./config.json');
 * const buffer = await readFile('./image.png', null);
 */
async function readFile(filePath, options = 'utf8') {
  validatePath(filePath, 'read file');
  return wrapOperation(
    () => fs.readFile(filePath, options),
    'read file',
    filePath
  );
}

/**
 * Write content to a file
 * @param {string} filePath - Path to the file
 * @param {string|Buffer} content - Content to write
 * @param {string|object} [options='utf8'] - Encoding or options object
 * @returns {Promise<void>}
 * 
 * @example
 * await writeFile('./output.txt', 'Hello World');
 * await writeFile('./data.json', JSON.stringify(data, null, 2));
 */
async function writeFile(filePath, content, options = 'utf8') {
  validatePath(filePath, 'write file');
  if (content === undefined || content === null) {
    throw new FileSystemError(
      'Content cannot be null or undefined',
      'INVALID_CONTENT',
      filePath
    );
  }
  return wrapOperation(
    () => fs.writeFile(filePath, content, options),
    'write file',
    filePath
  );
}

/**
 * Append content to a file
 * @param {string} filePath - Path to the file
 * @param {string|Buffer} content - Content to append
 * @param {string|object} [options='utf8'] - Encoding or options object
 * @returns {Promise<void>}
 * 
 * @example
 * await appendFile('./log.txt', 'New log entry\n');
 */
async function appendFile(filePath, content, options = 'utf8') {
  validatePath(filePath, 'append to file');
  if (content === undefined || content === null) {
    throw new FileSystemError(
      'Content cannot be null or undefined',
      'INVALID_CONTENT',
      filePath
    );
  }
  return wrapOperation(
    () => fs.appendFile(filePath, content, options),
    'append to file',
    filePath
  );
}

/**
 * Copy a file from source to destination
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 * @param {number} [flags=0] - Copy flags (fs.constants.COPYFILE_*)
 * @returns {Promise<void>}
 * 
 * @example
 * await copyFile('./source.txt', './backup.txt');
 */
async function copyFile(source, destination, flags = 0) {
  validatePath(source, 'copy file (source)');
  validatePath(destination, 'copy file (destination)');
  return wrapOperation(
    () => fs.copyFile(source, destination, flags),
    'copy file',
    `${source} -> ${destination}`
  );
}

/**
 * Move/rename a file
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 * @returns {Promise<void>}
 * 
 * @example
 * await moveFile('./old-name.txt', './new-name.txt');
 */
async function moveFile(source, destination) {
  validatePath(source, 'move file (source)');
  validatePath(destination, 'move file (destination)');
  return wrapOperation(
    () => fs.rename(source, destination),
    'move file',
    `${source} -> ${destination}`
  );
}

/**
 * Delete a file
 * @param {string} filePath - Path to the file to delete
 * @returns {Promise<void>}
 * 
 * @example
 * await deleteFile('./temp.txt');
 */
async function deleteFile(filePath) {
  validatePath(filePath, 'delete file');
  return wrapOperation(
    () => fs.unlink(filePath),
    'delete file',
    filePath
  );
}

/**
 * Check if a file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} True if file exists
 * 
 * @example
 * if (await fileExists('./config.json')) {
 *   // File exists
 * }
 */
async function fileExists(filePath) {
  validatePath(filePath, 'check file existence');
  try {
    await fs.access(filePath, fs.constants.F_OK);
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

/**
 * Get file/directory statistics
 * @param {string} filePath - Path to get stats for
 * @returns {Promise<fs.Stats>} File statistics
 * 
 * @example
 * const stats = await getStats('./file.txt');
 * console.log(`Size: ${stats.size} bytes`);
 * console.log(`Modified: ${stats.mtime}`);
 */
async function getStats(filePath) {
  validatePath(filePath, 'get file stats');
  return wrapOperation(
    () => fs.stat(filePath),
    'get file stats',
    filePath
  );
}

/**
 * Create a directory
 * @param {string} dirPath - Path of directory to create
 * @param {boolean} [recursive=true] - Create parent directories if needed
 * @returns {Promise<void>}
 * 
 * @example
 * await createDirectory('./path/to/new/dir');
 */
async function createDirectory(dirPath, recursive = true) {
  validatePath(dirPath, 'create directory');
  return wrapOperation(
    () => fs.mkdir(dirPath, { recursive }),
    'create directory',
    dirPath
  );
}

/**
 * Remove a directory
 * @param {string} dirPath - Path of directory to remove
 * @param {boolean} [recursive=false] - Remove directory and its contents
 * @returns {Promise<void>}
 *
 * @example
 * await removeDirectory('./temp-dir', true);
 */
async function removeDirectory(dirPath, recursive = false) {
  validatePath(dirPath, 'remove directory');
  return wrapOperation(
    () => recursive ? fs.rm(dirPath, { recursive, force: true }) : fs.rmdir(dirPath),
    'remove directory',
    dirPath
  );
}

/**
 * List directory contents
 * @param {string} dirPath - Path of directory to list
 * @param {object} [options={}] - Options for listing
 * @param {boolean} [options.withFileTypes=false] - Return Dirent objects
 * @param {boolean} [options.recursive=false] - List recursively
 * @returns {Promise<Array<string|fs.Dirent>>} Directory contents
 * 
 * @example
 * const files = await listDirectory('./src');
 * const detailed = await listDirectory('./src', { withFileTypes: true });
 */
async function listDirectory(dirPath, options = {}) {
  validatePath(dirPath, 'list directory');
  const { withFileTypes = false, recursive = false } = options;
  
  if (recursive) {
    return wrapOperation(
      async () => {
        const results = [];
        
        async function walkDir(currentPath) {
          const entries = await fs.readdir(currentPath, { withFileTypes: true });
          
          for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            const relativePath = path.relative(dirPath, fullPath);
            
            if (withFileTypes) {
              results.push({ ...entry, path: relativePath });
            } else {
              results.push(relativePath);
            }
            
            if (entry.isDirectory()) {
              await walkDir(fullPath);
            }
          }
        }
        
        await walkDir(dirPath);
        return results;
      },
      'list directory recursively',
      dirPath
    );
  }
  
  return wrapOperation(
    () => fs.readdir(dirPath, { withFileTypes }),
    'list directory',
    dirPath
  );
}

/**
 * Check if a directory exists
 * @param {string} dirPath - Path to check
 * @returns {Promise<boolean>} True if directory exists
 * 
 * @example
 * if (await directoryExists('./src')) {
 *   // Directory exists
 * }
 */
async function directoryExists(dirPath) {
  validatePath(dirPath, 'check directory existence');
  try {
    await fs.access(dirPath, fs.constants.F_OK);
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Resolve path segments into an absolute path
 * @param {...string} paths - Path segments to resolve
 * @returns {string} Resolved absolute path
 * 
 * @example
 * const fullPath = resolvePath('./src', 'components', 'Button.js');
 */
function resolvePath(...paths) {
  return path.resolve(...paths);
}

/**
 * Join path segments
 * @param {...string} paths - Path segments to join
 * @returns {string} Joined path
 * 
 * @example
 * const filePath = joinPath('src', 'utils', 'helpers.js');
 */
function joinPath(...paths) {
  return path.join(...paths);
}

/**
 * Normalize a path
 * @param {string} filePath - Path to normalize
 * @returns {string} Normalized path
 * 
 * @example
 * const normalized = normalizePath('./src/../lib/utils.js');
 */
function normalizePath(filePath) {
  validatePath(filePath, 'normalize path');
  return path.normalize(filePath);
}

/**
 * Get relative path from one path to another
 * @param {string} from - Source path
 * @param {string} to - Target path
 * @returns {string} Relative path
 * 
 * @example
 * const relative = relativePath('/src/components', '/src/utils/helpers.js');
 */
function relativePath(from, to) {
  validatePath(from, 'relative path (from)');
  validatePath(to, 'relative path (to)');
  return path.relative(from, to);
}

/**
 * Watch a file or directory for changes
 * @param {string} filePath - Path to watch
 * @param {Function} callback - Callback function for changes
 * @param {object} [options={}] - Watch options
 * @returns {fs.FSWatcher} File system watcher
 * 
 * @example
 * const watcher = watchFile('./config.json', (eventType, filename) => {
 *   console.log(`File ${filename} changed: ${eventType}`);
 * });
 */
function watchFile(filePath, callback, options = {}) {
  validatePath(filePath, 'watch file');
  if (typeof callback !== 'function') {
    throw new FileSystemError(
      'Callback must be a function',
      'INVALID_CALLBACK',
      filePath
    );
  }
  
  return fsSync.watch(filePath, options, callback);
}

/**
 * Search for files matching a pattern in a directory
 * @param {string} directory - Directory to search in
 * @param {string|RegExp} pattern - Pattern to match (glob or regex)
 * @param {object} [options={}] - Search options
 * @param {boolean} [options.recursive=true] - Search recursively
 * @param {boolean} [options.includeDirectories=false] - Include directories in results
 * @returns {Promise<Array<string>>} Array of matching file paths
 * 
 * @example
 * const jsFiles = await searchFiles('./src', /\.js$/);
 * const configFiles = await searchFiles('.', '*config*');
 */
async function searchFiles(directory, pattern, options = {}) {
  validatePath(directory, 'search files');
  const { recursive = true, includeDirectories = false } = options;
  
  return wrapOperation(
    async () => {
      const results = [];
      const isRegex = pattern instanceof RegExp;
      const globPattern = isRegex ? null : pattern;
      
      async function searchDir(currentDir) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          const relativePath = path.relative(directory, fullPath);
          
          if (entry.isDirectory()) {
            if (includeDirectories && matchesPattern(entry.name, pattern, isRegex)) {
              results.push(relativePath);
            }
            if (recursive) {
              await searchDir(fullPath);
            }
          } else if (entry.isFile()) {
            if (matchesPattern(entry.name, pattern, isRegex)) {
              results.push(relativePath);
            }
          }
        }
      }
      
      await searchDir(directory);
      return results;
    },
    'search files',
    directory
  );
}

/**
 * Helper function to match patterns
 * @private
 */
function matchesPattern(filename, pattern, isRegex) {
  if (isRegex) {
    return pattern.test(filename);
  }
  
  // Simple glob pattern matching
  const regexPattern = pattern
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  
  return new RegExp(`^${regexPattern}$`, 'i').test(filename);
}

/**
 * Perform multiple file system operations in batch
 * @param {Array<object>} operations - Array of operation objects
 * @returns {Promise<Array>} Array of operation results
 * 
 * @example
 * const results = await batchOperation([
 *   { type: 'read', path: './file1.txt' },
 *   { type: 'write', path: './file2.txt', content: 'Hello' },
 *   { type: 'copy', source: './src.txt', destination: './dest.txt' }
 * ]);
 */
async function batchOperation(operations) {
  if (!Array.isArray(operations)) {
    throw new FileSystemError(
      'Operations must be an array',
      'INVALID_OPERATIONS',
      'batch'
    );
  }
  
  const results = [];
  
  for (const operation of operations) {
    try {
      let result;
      
      switch (operation.type) {
        case 'read':
          result = await readFile(operation.path, operation.options);
          break;
        case 'write':
          result = await writeFile(operation.path, operation.content, operation.options);
          break;
        case 'append':
          result = await appendFile(operation.path, operation.content, operation.options);
          break;
        case 'copy':
          result = await copyFile(operation.source, operation.destination, operation.flags);
          break;
        case 'move':
          result = await moveFile(operation.source, operation.destination);
          break;
        case 'delete':
          result = await deleteFile(operation.path);
          break;
        case 'mkdir':
          result = await createDirectory(operation.path, operation.recursive);
          break;
        case 'rmdir':
          result = await removeDirectory(operation.path, operation.recursive);
          break;
        default:
          throw new FileSystemError(
            `Unknown operation type: ${operation.type}`,
            'UNKNOWN_OPERATION',
            operation.path || 'unknown'
          );
      }
      
      results.push({ success: true, result, operation });
    } catch (error) {
      results.push({ success: false, error, operation });
    }
  }
  
  return results;
}

/**
 * # fs
 * 
 * Export comprehensive file system utilities with promise-based API.
 * 
 * @module cli/fs
 * @returns {Object} - File system utilities
 * 
 * @example
 * import { fs } from "@jlongyam/cli";
 * 
 * // Read a file
 * const content = await fs.readFile('./config.json');
 * 
 * // Create directory and write file
 * await fs.createDirectory('./output');
 * await fs.writeFile('./output/result.txt', 'Hello World');
 * 
 * // Copy files in batch
 * const results = await fs.batchOperation([
 *   { type: 'copy', source: './src.txt', destination: './backup.txt' },
 *   { type: 'write', path: './log.txt', content: 'Operation completed' }
 * ]);
 */
export const fs = {
  // File operations
  readFile,
  writeFile,
  appendFile,
  copyFile,
  moveFile,
  deleteFile,
  fileExists,
  getStats,
  
  // Directory operations
  createDirectory,
  removeDirectory,
  listDirectory,
  directoryExists,
  
  // Path utilities
  resolvePath,
  joinPath,
  normalizePath,
  relativePath,
  
  // Advanced features
  watchFile,
  searchFiles,
  batchOperation,
  
  // Error class for custom error handling
  FileSystemError
};

// Export individual functions for convenience
export {
  readFile,
  writeFile,
  appendFile,
  copyFile,
  moveFile,
  deleteFile,
  fileExists,
  getStats,
  createDirectory,
  removeDirectory,
  listDirectory,
  directoryExists,
  resolvePath,
  joinPath,
  normalizePath,
  relativePath,
  watchFile,
  searchFiles,
  batchOperation,
  FileSystemError
};