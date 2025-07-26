function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var parse$2;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse$2;
	hasRequiredParse = 1;

	/*
		Straight-forward node.js arguments parser
		Author: eveningkid
		License: Apache-2.0
	*/

	const ARGUMENT_SEPARATION_REGEX = /([^=\s]+)=?\s*(.*)/;

	function Parse(argv) {
	  // Removing node/bin and called script name
	  argv = argv.slice(2);

	  const parsedArgs = {};
	  let argName, argValue;

	  argv.forEach(function (arg) {
	    // Separate argument for a key/value return
	    arg = arg.match(ARGUMENT_SEPARATION_REGEX);
	    arg.splice(0, 1);

	    // Retrieve the argument name
	    argName = arg[0];

	    // Remove "--" or "-"
	    if (argName.indexOf('-') === 0) {
	      argName = argName.slice(argName.slice(0, 2).lastIndexOf('-') + 1);
	    }

	    // Parse argument value or set it to `true` if empty
	    argValue =
	      arg[1] !== ''
	        ? parseFloat(arg[1]).toString() === arg[1]
	          ? +arg[1]
	          : arg[1]
	        : true;

	    parsedArgs[argName] = argValue;
	  });

	  return parsedArgs;
	}

	parse$2 = Parse;
	return parse$2;
}

var parseExports = requireParse();
var parse = /*@__PURE__*/getDefaultExportFromCjs(parseExports);

var parse$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: parse
});

const { default: Parse } = await Promise.resolve().then(function () { return parse$1; });

const args = Parse(process.argv);

export { args };
