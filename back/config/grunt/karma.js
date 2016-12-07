module.exports = function(cnf) {



	return {
		unit: {
			configFile: './config/karma/karma.conf.js',
			background: false,
			singleRun: true,
			autoWatch: false
		}
	};
};
