var debug = require('debug')('grunt:cnf');
const fs = require('fs');
const path = require('path');
module.exports = function(cnf) {
		return {
				barrels: {
						cmd: 'node config/_utils/barrels.js'
				},
				protractor: {
						stdout: false,
						stderr: false,
						cmd: function() {
								return cnf.e2eIsActive ? 'grunt protractor' : ''
						}
				},
				info: {
						cmd: function() {
								debug(cnf);
								debug({
										selenium: 'http://' + cnf.seleniumHost + ':' + cnf.seleniumPort + '/',
										karma: 'http://' + cnf.karmaHost + ':' + cnf.karmaPort + '/',
										httpApp: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + cnf.build + '/',
										httpE2e: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + cnf.tests.reports.protractor.results + '/e2e.html',
										httpKarma: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + cnf.tests.reports.karma.coverage,
										httpKarmaResults: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + cnf.tests.reports.karma.results + '/karma.html',
								});

								return '';
						}
				},
				infoKarma: {
						cmd: function() {
								debug({
										karma: 'http://' + cnf.karmaHost + ':' + cnf.karmaPort + '/',
										httpKarma: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + cnf.tests.reports.karma.coverage,
										httpKarmaResults: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + cnf.tests.reports.karma.results + '/karma.html',
								});

								return '';
						}
				},
				nodeModules: {
					// stdout: false,
					// stderr: false,
					cmd: function() {
						var pthNodeModules = cnf.npm.src;
						var pthDist = cnf.npm.dest;

						if(!fs.existsSync(path.resolve(pthDist, 'node_modules'))) {
							console.log('ln -s ' + pthNodeModules + ' ' + pthDist);
							return 'ln -s ' + pthNodeModules + ' ' + pthDist;
						} else {
							return '';
						}
					}
				}
		};
};
