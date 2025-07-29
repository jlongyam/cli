import path from 'path';
import os from 'os';
import fs from 'fs';
// Get the user's home directory
const homeDir = os.homedir();

// Construct a path to a configuration file in the home directory
// const configPath = path.join(homeDir, '.myApp', 'config.json');

// console.log(`Configuration file path: ${configPath}`);
//
function say(inp) {
  console.log(inp)
}
fs.readFile(homeDir+'/.zshrc', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        // console.log(data);
        say(data)
    });
fs.readdir(homeDir,(err,files=> {
  console.log(files)
}))

const newFilePath = path.join(homeDir, 'myNewFile.txt');
const fileContent = 'Hello, Node.js file creation!';

// Asynchronously create and write to a file.
// If the file already exists, its content will be overwritten.
fs.writeFile(newFilePath, fileContent, 'utf8', (err) => {
  if (err) {
    console.error('Error creating file asynchronously:', err);
    return;
  }
  console.log(`File created successfully at: ${newFilePath}`);
});

// Synchronously create and write to a file.
try {
  const anotherFilePath = path.join(homeDir, 'mySyncFile.txt');
  fs.writeFileSync(anotherFilePath, 'Hello from sync write!');
  console.log(`Sync file created successfully at: ${anotherFilePath}`);
} catch (err) {
  console.error('Error creating file synchronously:', err);
}