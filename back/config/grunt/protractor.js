module.exports = function(cnf) {
	return {
		options: {
			configFile: './config/protractor/protractor.conf.js', // Default config file
			keepAlive: true, // If false, the grunt process stops when the test fails.
			noColor: false, // If true, protractor will not use colors in its output.
			debug: false,
			args: {
				// Arguments passed to the command
			}
		},
		your_target: {	 // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
			options: {
				// configFile: './config/protractor/protractor.conf.js', // Target-specific config file
				args: {} // Target-specific arguments
			}
		},
	};
};
