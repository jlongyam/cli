function parseArgs() {
  const result = {};
  const cliArgs = process.argv.slice(2);
  
  // Skip 4th argument if present
  if (cliArgs.length > 3) cliArgs.splice(3, 1);

  for (let i = 0; i < cliArgs.length; i++) {
    const arg = cliArgs[i];

    // Handle --flags (both --flag value and --flag=value)
    if (arg.startsWith('--')) {
      // Check for --flag=value format
      if (arg.includes('=')) {
        const [key, value] = arg.slice(2).split('=');
        result[key] = value;
      } 
      // Handle --flag value format
      else {
        const key = arg.slice(2);
        // Check if next argument is a value (not another flag)
        if (i + 1 < cliArgs.length && !cliArgs[i + 1].startsWith('-')) {
          result[key] = cliArgs[i + 1];
          i++; // Skip the next argument since we used it as value
        } else {
          result[key] = true; // Boolean flag
        }
      }
      continue;
    }

    // Handle -flags (-n or -n=value or -abc)
    if (arg.startsWith('-') && arg.length > 1) {
      // Check for -flag=value format
      if (arg.includes('=')) {
        const [flag, value] = arg.slice(1).split('=');
        result[flag] = value;
        continue;
      }
      
      const flags = arg.slice(1).split('');
      flags.forEach((flag, index) => {
        // Only last flag in group can have a separate value
        if (index === flags.length - 1 && 
            i + 1 < cliArgs.length && 
            !cliArgs[i + 1].startsWith('-')) {
          result[flag] = cliArgs[++i];
        } else {
          result[flag] = true;
        }
      });
      continue;
    }

    // Standalone arguments
    result[arg] = true;
  }

  return result;
}

export default parseArgs;