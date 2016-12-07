var debug = require('debug')('grunt:cnf');
const fs = require('fs');
const path = require('path');
const util = require('../_utils/');

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
										httpE2e: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + util.tests.reports.protractor.results + '/e2e.html',
										httpKarma: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + util.tests.reports.karma.coverage,
										httpKarmaResults: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + util.tests.reports.karma.results + '/karma.html',
								});

								return '';
						}
				},
				infoKarma: {
						cmd: function() {
								debug({
										karma: 'http://' + cnf.karmaHost + ':' + cnf.karmaPort + '/',
										httpKarma: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + util.tests.reports.karma.coverage,
										httpKarmaResults: 'http://' + cnf.httpHost + ':' + cnf.httpPort + '/' + util.tests.reports.karma.results + '/karma.html',
								});

								return '';
						}
				},
				nodeModules: {
					// stdout: false,
					// stderr: false,
					cmd: function() {
						var pthNodeModules = path.resolve(cnf.root, 'node_modules');
						var pthDist = cnf.build;

						if(fs.existsSync(path.resolve(pthDist, 'node_modules'))) {
							return '';
						} else {
							console.log('ln -s ' + pthNodeModules + ' ' + pthDist);
							return 'ln -s ' + pthNodeModules + ' ' + pthDist;

						}
					}
				},
				server: {

					cmd: function(on) {
						const spawn = require('child_process').spawn;

						let proc = spawn('node', ['dist/gbuild/app/webWorker.js']);

						proc.stderr.on('data', (data) => {
							debug(`ps stderr: ${data}`);
						});

						proc.on('close', (code) => {
							if (code !== 0) {
								debug(`ps process exited with code ${code}`);
							}
							// grep.stdin.end();
						});

						fs.watch('dist/gbuild/app', (eventType, filename) => {
							console.log(`event type is: ${eventType}`);
							if (filename) {
								proc.kill('SIGHUP');

								proc = spawn('node', ['dist/gbuild/app/webWorker.js']);

								debug(`filename provided: ${filename}`);

							} else {
								debug('filename not provided');
							}
						});

						return '';
					}
				}
		};
};
