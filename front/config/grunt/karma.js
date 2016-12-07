// module.exports = function(cnf) {
// 	return {
// 		unit: {
// 			configFile: './config/karma/karma.conf.js',
// 			background: true,
// 			singleRun: false
// 		}
// 	};
// };


module.exports = function(cnf) {

	// process.env.karma = 'fsefsefr';

	return {
		unit: {
			configFile: './config/karma/karma.conf.js',
			background: true,
			singleRun: false,
			autoWatch: false
		}
	};
};
