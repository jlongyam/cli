import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fs, FileSystemError } from '../../src/fs.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test directory for temporary files
const testDir = path.join(__dirname, 'temp-test');
const testFile = path.join(testDir, 'test.txt');
const testFile2 = path.join(testDir, 'test2.txt');
const testSubDir = path.join(testDir, 'subdir');

describe('File System Module', () => {
  beforeEach(async () => {
    // Clean up and create test directory
    try {
      await fs.removeDirectory(testDir, true);
    } catch (error) {
      // Directory might not exist, ignore error
    }
    await fs.createDirectory(testDir);
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await fs.removeDirectory(testDir, true);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('File Operations', () => {
    describe('writeFile and readFile', () => {
      it('should write and read text files', async () => {
        const content = 'Hello, World!';
        await fs.writeFile(testFile, content);
        const readContent = await fs.readFile(testFile);
        expect(readContent).toBe(content);
      });

      it('should write and read JSON files', async () => {
        const data = { name: 'test', value: 42 };
        const content = JSON.stringify(data, null, 2);
        await fs.writeFile(testFile, content);
        const readContent = await fs.readFile(testFile);
        expect(JSON.parse(readContent)).toEqual(data);
      });

      it('should handle different encodings', async () => {
        const content = 'Test content';
        await fs.writeFile(testFile, content, 'utf8');
        const buffer = await fs.readFile(testFile, null);
        expect(Buffer.isBuffer(buffer)).toBe(true);
        expect(buffer.toString('utf8')).toBe(content);
      });

      it('should throw error for invalid paths', async () => {
        await expect(fs.readFile('')).rejects.toThrow(FileSystemError);
        await expect(fs.readFile(null)).rejects.toThrow(FileSystemError);
        await expect(fs.writeFile('', 'content')).rejects.toThrow(FileSystemError);
      });

      it('should throw error for null content', async () => {
        await expect(fs.writeFile(testFile, null)).rejects.toThrow(FileSystemError);
        await expect(fs.writeFile(testFile, undefined)).rejects.toThrow(FileSystemError);
      });
    });

    describe('appendFile', () => {
      it('should append content to existing file', async () => {
        await fs.writeFile(testFile, 'Hello');
        await fs.appendFile(testFile, ', World!');
        const content = await fs.readFile(testFile);
        expect(content).toBe('Hello, World!');
      });

      it('should create file if it does not exist', async () => {
        await fs.appendFile(testFile, 'New content');
        const content = await fs.readFile(testFile);
        expect(content).toBe('New content');
      });
    });

    describe('copyFile', () => {
      it('should copy file successfully', async () => {
        const content = 'File to copy';
        await fs.writeFile(testFile, content);
        await fs.copyFile(testFile, testFile2);
        
        const originalContent = await fs.readFile(testFile);
        const copiedContent = await fs.readFile(testFile2);
        
        expect(originalContent).toBe(content);
        expect(copiedContent).toBe(content);
      });
    });

    describe('moveFile', () => {
      it('should move file successfully', async () => {
        const content = 'File to move';
        await fs.writeFile(testFile, content);
        await fs.moveFile(testFile, testFile2);
        
        const exists1 = await fs.fileExists(testFile);
        const exists2 = await fs.fileExists(testFile2);
        const movedContent = await fs.readFile(testFile2);
        
        expect(exists1).toBe(false);
        expect(exists2).toBe(true);
        expect(movedContent).toBe(content);
      });
    });

    describe('deleteFile', () => {
      it('should delete file successfully', async () => {
        await fs.writeFile(testFile, 'File to delete');
        const existsBefore = await fs.fileExists(testFile);
        await fs.deleteFile(testFile);
        const existsAfter = await fs.fileExists(testFile);
        
        expect(existsBefore).toBe(true);
        expect(existsAfter).toBe(false);
      });
    });

    describe('fileExists', () => {
      it('should return true for existing file', async () => {
        await fs.writeFile(testFile, 'Test');
        const exists = await fs.fileExists(testFile);
        expect(exists).toBe(true);
      });

      it('should return false for non-existing file', async () => {
        const exists = await fs.fileExists(path.join(testDir, 'nonexistent.txt'));
        expect(exists).toBe(false);
      });

      it('should return false for directory', async () => {
        await fs.createDirectory(testSubDir);
        const exists = await fs.fileExists(testSubDir);
        expect(exists).toBe(false);
      });
    });

    describe('getStats', () => {
      it('should return file statistics', async () => {
        const content = 'Test content';
        await fs.writeFile(testFile, content);
        const stats = await fs.getStats(testFile);
        
        expect(stats.isFile()).toBe(true);
        expect(stats.isDirectory()).toBe(false);
        expect(stats.size).toBe(Buffer.byteLength(content, 'utf8'));
        expect(stats.mtime).toBeInstanceOf(Date);
      });
    });
  });

  describe('Directory Operations', () => {
    describe('createDirectory', () => {
      it('should create directory', async () => {
        await fs.createDirectory(testSubDir);
        const exists = await fs.directoryExists(testSubDir);
        expect(exists).toBe(true);
      });

      it('should create nested directories recursively', async () => {
        const nestedDir = path.join(testSubDir, 'nested', 'deep');
        await fs.createDirectory(nestedDir, true);
        const exists = await fs.directoryExists(nestedDir);
        expect(exists).toBe(true);
      });
    });

    describe('removeDirectory', () => {
      it('should remove empty directory', async () => {
        await fs.createDirectory(testSubDir);
        const existsBefore = await fs.directoryExists(testSubDir);
        await fs.removeDirectory(testSubDir);
        const existsAfter = await fs.directoryExists(testSubDir);
        
        expect(existsBefore).toBe(true);
        expect(existsAfter).toBe(false);
      });

      it('should remove directory with contents recursively', async () => {
        await fs.createDirectory(testSubDir);
        await fs.writeFile(path.join(testSubDir, 'file.txt'), 'content');
        
        await fs.removeDirectory(testSubDir, true);
        const exists = await fs.directoryExists(testSubDir);
        expect(exists).toBe(false);
      });
    });

    describe('listDirectory', () => {
      beforeEach(async () => {
        await fs.createDirectory(testSubDir);
        await fs.writeFile(path.join(testDir, 'file1.txt'), 'content1');
        await fs.writeFile(path.join(testDir, 'file2.js'), 'content2');
        await fs.writeFile(path.join(testSubDir, 'nested.txt'), 'nested content');
      });

      it('should list directory contents', async () => {
        const contents = await fs.listDirectory(testDir);
        expect(contents).toContain('file1.txt');
        expect(contents).toContain('file2.js');
        expect(contents).toContain('subdir');
      });

      it('should list with file types', async () => {
        const contents = await fs.listDirectory(testDir, { withFileTypes: true });
        const fileNames = contents.map(entry => entry.name);
        const fileTypes = contents.map(entry => entry.isFile());
        
        expect(fileNames).toContain('file1.txt');
        expect(fileTypes).toContain(true);
      });

      it('should list recursively', async () => {
        const contents = await fs.listDirectory(testDir, { recursive: true });
        expect(contents).toContain('file1.txt');
        expect(contents).toContain('subdir');
        expect(contents).toContain(path.join('subdir', 'nested.txt'));
      });
    });

    describe('directoryExists', () => {
      it('should return true for existing directory', async () => {
        await fs.createDirectory(testSubDir);
        const exists = await fs.directoryExists(testSubDir);
        expect(exists).toBe(true);
      });

      it('should return false for non-existing directory', async () => {
        const exists = await fs.directoryExists(path.join(testDir, 'nonexistent'));
        expect(exists).toBe(false);
      });

      it('should return false for file', async () => {
        await fs.writeFile(testFile, 'content');
        const exists = await fs.directoryExists(testFile);
        expect(exists).toBe(false);
      });
    });
  });

  describe('Path Utilities', () => {
    describe('resolvePath', () => {
      it('should resolve absolute path', () => {
        const resolved = fs.resolvePath('./test', '../parent');
        expect(path.isAbsolute(resolved)).toBe(true);
      });
    });

    describe('joinPath', () => {
      it('should join path segments', () => {
        const joined = fs.joinPath('src', 'components', 'Button.js');
        expect(joined).toBe(path.join('src', 'components', 'Button.js'));
      });
    });

    describe('normalizePath', () => {
      it('should normalize path', () => {
        const normalized = fs.normalizePath('./src/../lib/utils.js');
        expect(normalized).toBe(path.normalize('./src/../lib/utils.js'));
      });
    });

    describe('relativePath', () => {
      it('should return relative path', () => {
        const relative = fs.relativePath('/src/components', '/src/utils/helpers.js');
        expect(relative).toBe(path.relative('/src/components', '/src/utils/helpers.js'));
      });
    });
  });

  describe('Advanced Features', () => {
    describe('searchFiles', () => {
      beforeEach(async () => {
        await fs.createDirectory(testSubDir);
        await fs.writeFile(path.join(testDir, 'test.js'), 'js content');
        await fs.writeFile(path.join(testDir, 'test.txt'), 'txt content');
        await fs.writeFile(path.join(testDir, 'config.json'), 'json content');
        await fs.writeFile(path.join(testSubDir, 'nested.js'), 'nested js');
      });

      it('should search files with regex pattern', async () => {
        const jsFiles = await fs.searchFiles(testDir, /\.js$/);
        expect(jsFiles).toContain('test.js');
        expect(jsFiles).toContain(path.join('subdir', 'nested.js'));
        expect(jsFiles).not.toContain('test.txt');
      });

      it('should search files with glob pattern', async () => {
        const configFiles = await fs.searchFiles(testDir, '*config*');
        expect(configFiles).toContain('config.json');
      });

      it('should search non-recursively', async () => {
        const files = await fs.searchFiles(testDir, /\.js$/, { recursive: false });
        expect(files).toContain('test.js');
        expect(files).not.toContain(path.join('subdir', 'nested.js'));
      });
    });

    describe('batchOperation', () => {
      it('should perform multiple operations successfully', async () => {
        const operations = [
          { type: 'write', path: testFile, content: 'Hello' },
          { type: 'write', path: testFile2, content: 'World' },
          { type: 'read', path: testFile },
          { type: 'copy', source: testFile, destination: path.join(testDir, 'copy.txt') }
        ];

        const results = await fs.batchOperation(operations);
        
        expect(results).toHaveLength(4);
        expect(results[0].success).toBe(true);
        expect(results[1].success).toBe(true);
        expect(results[2].success).toBe(true);
        expect(results[2].result).toBe('Hello');
        expect(results[3].success).toBe(true);
      });

      it('should handle operation failures gracefully', async () => {
        const operations = [
          { type: 'write', path: testFile, content: 'Hello' },
          { type: 'read', path: '/nonexistent/file.txt' },
          { type: 'write', path: testFile2, content: 'World' }
        ];

        const results = await fs.batchOperation(operations);
        
        expect(results).toHaveLength(3);
        expect(results[0].success).toBe(true);
        expect(results[1].success).toBe(false);
        expect(results[1].error).toBeInstanceOf(FileSystemError);
        expect(results[2].success).toBe(true);
      });

      it('should throw error for invalid operations array', async () => {
        await expect(fs.batchOperation('not an array')).rejects.toThrow(FileSystemError);
      });

      it('should throw error for unknown operation type', async () => {
        const operations = [{ type: 'unknown', path: testFile }];
        const results = await fs.batchOperation(operations);
        
        expect(results[0].success).toBe(false);
        expect(results[0].error).toBeInstanceOf(FileSystemError);
      });
    });

    describe('watchFile', () => {
      it('should create file watcher', async () => {
        await fs.writeFile(testFile, 'initial content');
        
        let changeDetected = false;
        const watcher = fs.watchFile(testFile, () => {
          changeDetected = true;
        });

        expect(watcher).toBeDefined();
        expect(typeof watcher.close).toBe('function');
        
        // Clean up
        watcher.close();
      });

      it('should throw error for invalid callback', async () => {
        await fs.writeFile(testFile, 'content');
        expect(() => fs.watchFile(testFile, 'not a function')).toThrow(FileSystemError);
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw FileSystemError with proper properties', async () => {
      try {
        await fs.readFile('/nonexistent/file.txt');
      } catch (error) {
        expect(error).toBeInstanceOf(FileSystemError);
        expect(error.name).toBe('FileSystemError');
        expect(error.code).toBeDefined();
        expect(error.path).toBe('/nonexistent/file.txt');
        expect(error.message).toContain('Failed to read file');
      }
    });

    it('should validate paths properly', async () => {
      const invalidPaths = ['', null, undefined, 123, {}];
      
      for (const invalidPath of invalidPaths) {
        await expect(fs.readFile(invalidPath)).rejects.toThrow(FileSystemError);
        await expect(fs.writeFile(invalidPath, 'content')).rejects.toThrow(FileSystemError);
      }
    });
  });
});