var dir;

// realsocket core developers, start your app with SS_DEV=1 to run the CoffeeScript /src code at runtime
if (process.env['SS_DEV']) {
	dir = 'src';
	console.log("Running CoffeeScript code in /src for RealSocket core developers\nType 'make build' in the realsocket project directory to re-generate /lib when done")
	require('coffee-script');
} else {
	dir = 'lib';
}

// Load RealSocket core
module.exports = require('./' + dir);