const path = require('path');

const config = require('config');
const debug = require('debug')('grunt:cnf:gruntfile.js');

console.log('To show debug info set DEBUG="grunt*"');
console.log(' set -x DEBUG \'grunt*\'');

let build = path.resolve('.', 'dist', 'gbuild');

const IS_BACK = true;

let cnf = {
	srcApp: path.resolve('.', 'src', 'app'),
	root: path.resolve('.'),
	build: build,

	httpPort: config.get('http.port'),
	httpHost: config.get('http.host'),

	workingPath: ''
};

/* karma conf */
// cnf.karma.src = 'app/';
let tasks;
switch (true) {
	case process.env.wpath !== undefined:
		cnf.workingPath = process.env.wpath;
	break;
	case /^q?hot:app-karma/.test(process.argv[2]):
		tasks = process.argv[2].split(':');

		if (tasks.length === 3) {
				cnf.workingPath += tasks[2] + '/';
				process.env.wpath = tasks[2];
		}
	break;
}

cnf.ts = {
		app: {
				src: cnf.srcApp,
				dest: cnf.build + '/app/'
		},
		appModule: {
				src: cnf.srcApp + '/' + cnf.workingPath + '/',
				dest: cnf.build + '/app/'
		},
		spec: {
				src: cnf.srcApp + '/' + cnf.workingPath + '/',
				dest: cnf.build + '/app/',
		}
};

process.env.karmaTestsRoot = 'app/' + cnf.workingPath;
debug(cnf);

module.exports = function(grunt) {
		'use strict';

		let initConfig = {
			tslint: require('./config/grunt/tslint.js'),
			todo: require('./config/grunt/todo.js'),
			copy: require('./config/grunt/copy.js')(cnf),
			clean: require('./config/grunt/clean.js')(cnf),
			watch: require('./config/grunt/watch.js')(cnf),

			// 'http-server': require('./config/grunt/http-server.js')(cnf),
			// browserSync: require('./config/grunt/browserSync.js')(cnf),
			ts: require('./config/grunt/ts.js')(cnf),
			exec: require('./config/grunt/exec.js')(cnf),
			replace: require('./config/grunt/replace.js')(Object.assign({}, cnf, {
				variables: config.get('app')
			})),
		};

		switch(IS_BACK) {
			case true:
				initConfig = Object.assign({}, initConfig, {
					'jasmine_nodejs': require('./config/grunt/jasmine_nodejs.js')(cnf),

				});
			break;
			default:

				initConfig = Object.assign({}, initConfig, {
					/* End 2 end testing */
					webdrivermanager: require('./config/grunt/webdrivermanager.js')(cnf),
					protractor: require('./config/grunt/protractor.js')(cnf),
					sass: {
							template: require('./config/grunt/sass.js')(cnf.sass.template)
					}
				});
		}

		grunt.initConfig(initConfig);

		grunt.registerTask('server:background', [
				// 'http-server:background'
				// 'browserSync'
				IS_BACK ? 'exec:server' : 'browserSync'
		]);

		switch (IS_BACK) {
			case true:
				grunt.registerTask('compile:app', [
						'tslint',
						'clean:build',

						'copy:app',

						// 'compile:templateSing',
						'ts:app',
						'ts:appModule',
				]);

				grunt.registerTask('compile:spec', [
						'exec:nodeModules',
						'ts:spec',
						'jasmine_nodejs'
				]);
			break;
			default:
				grunt.registerTask('compile:app', [
						'tslint',
						'clean:build',

						/* template copy */
						'compile:template',
						'copy:app',

						// 'compile:templateSing',
						'ts:app',
						'ts:appModule',

						'exec:barrels',
						'compile:bower'
				]);

				grunt.registerTask('compile:template', [
						'sass:template',
						'copy:template'
				]);


				grunt.registerTask('compile:bower', [
						'copy:bower',
				]);

				grunt.registerTask('compile:spec', [
						'ts:spec',
						'copy:karma',
						'karma'
				]);

				grunt.registerTask('compile:e2e', [
						'clean:e2e',
						'ts:e2e',
						'protractor'
				]);

				grunt.registerTask('hot:app-karma-e2e', [
						'compile:app',
						'compile:spec',

						'server:background',
						'webdrivermanager:start',


						'compile:e2e',
						'exec:info',
						'todo',
						'watch'
				]);

				grunt.registerTask('hot:e2e', [
						'server:background',
						'webdrivermanager:start',

						/* e2e protractor */
						'compile:e2e',

						'exec:info',
						'todo',
						// 'watch:e2e'
						'watch'
				]);

				grunt.registerTask('hot:template', [
						'clean:build',
						'copy:template',
						'server:background',
						// 'watch:template'
						'watch'
				]);

				grunt.registerTask('default', [
						'clean:build',
						'compile:template',
						'replace',
						'server:background',
						// 'watch:template'
						'watch'
				]);
		}

		grunt.registerTask('hot:app', [
				'compile:app',
				'server:background',
				'exec:info',
				'todo',
				// 'watch:app'
				'watch'
		]);

		grunt.registerTask('qhot:app', [
				'compile:app',

				'server:background',
				'watch:tsModule'
		]);

		grunt.registerTask('hot:app-karma', [
				'compile:app',

				/* karma */
				'compile:spec',

				'server:background',
				'exec:info',
				'todo',
				// 'watch:app-karma'
				'watch'
		]);

		grunt.registerTask('qhot:app-karma', [
				'compile:spec',
				'server:background',
				'watch'
		]);

		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-jasmine-nodejs');
		grunt.loadNpmTasks('grunt-webpack');
		grunt.loadNpmTasks('grunt-protractor-runner');
		grunt.loadNpmTasks('grunt-karma');
		grunt.loadNpmTasks('grunt-ts');
		grunt.loadNpmTasks('grunt-todo');
		grunt.loadNpmTasks('grunt-typedoc');
		grunt.loadNpmTasks('grunt-tslint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-webdriver-manager');
		grunt.loadNpmTasks('grunt-selenium-standalone');
		grunt.loadNpmTasks('grunt-http-server');
		grunt.loadNpmTasks('grunt-rename');
		grunt.loadNpmTasks('grunt-browser-sync');
		grunt.loadNpmTasks('grunt-contrib-sass');
		// grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-express');
		grunt.loadNpmTasks('grunt-exec');
		// grunt.loadNpmTasks('grunt-concurrent');


		grunt.loadNpmTasks('grunt-replace');

};
