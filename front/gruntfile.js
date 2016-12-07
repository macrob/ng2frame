const path = require('path');

const config = require('config');
const debug = require('debug')('grunt:cnf:gruntfile.js');

console.log('To show debug info set DEBUG="grunt*"');
console.log(' set -x DEBUG \'grunt*\'');

const IS_BACK = false;

const CONF_BUILD = path.resolve('.', 'dist', 'gbuild');
const CONF_TMPL = 'html5-boilerplate';

let wPath = '';

switch (true) {
	case process.env.wpath !== undefined:
		wPath = process.env.wpath;
	break;
	case /^q?hot:app-karma/.test(process.argv[2]):
		let tasks = process.argv[2].split(':');

		if (tasks.length === 3) {
				wPath += tasks[2] + '/';
				process.env.wpath = tasks[2];
		}
	break;
}

process.env.karmaTestsRoot = 'app/' + wPath;

let cnf = {
	srcApp: path.resolve('.', 'src', 'app'),
	root: path.resolve('.'),
	workingPath: wPath,
	build: CONF_BUILD,

	httpPort: config.get('http.port'),
	httpHost: config.get('http.host'),

	workingPath: wPath,
	ts: {
		app: {
			src: path.resolve('.', 'src', 'app'),
			dest: path.resolve(CONF_BUILD, 'app'),
		},
		appModule: {
			src: path.resolve('.', 'src', 'app', wPath),
			dest: path.resolve(CONF_BUILD, 'app'),
		},
		spec: {
			src: path.resolve('.', 'src', 'app', wPath),
			dest: path.resolve(CONF_BUILD, 'app'),
		}
	}
};

if (!IS_BACK) {
	cnf = Object.assign({}, cnf, {
		srcTpl: path.resolve('.', 'src', CONF_TMPL),
		e2eBuild: path.resolve('.', 'dist', 'e2e'),
		e2eIsActive: /e2e/.test(process.argv[2]),
		seleniumPort: config.get('selenium.port'),
		seleniumHost: config.get('selenium.host'),
		karmaPort: config.get('karma.port'),
		karmaHost: config.get('karma.host'),
		sass: {
				template: {
						src: path.resolve('.', 'src', CONF_TMPL, 'scss'),
						dest: path.resolve(CONF_BUILD, 'css')
				}
		},
	});
}

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

		grunt.registerTask('default', [
			'hot:app-karma'
		]);

		switch (IS_BACK) {
			case true:
				grunt.registerTask('server:background', [
						'exec:server'
				]);

				grunt.registerTask('compile:app', [
						'tslint',
						'clean:build',

						'copy:app',

						// 'compile:templateSing',
						'ts:app',
						'ts:appModule',
						'replace',
				]);

				grunt.registerTask('compile:spec', [
						'exec:nodeModules',
						'ts:spec',
						'jasmine_nodejs'
				]);
			break;
			default:
				grunt.registerTask('server:background', [
						// 'http-server:background'
						// 'browserSync'
						'browserSync'
				]);

				grunt.registerTask('compile:app', [
						'tslint',
						'clean:build',

						/* template copy */
						'compile:template',
						'copy:app',

						// 'compile:templateSing',
						'ts:app',
						'ts:appModule',
						'replace',
						'exec:barrels',
						'compile:bower'
				]);

				grunt.registerTask('compile:template', [
						'clean:build',
						'sass:template',
						'copy:template',
						'replace'
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
						// 'clean:build',
						// 'copy:template',
						'compile:template',
						'server:background',
						// 'watch:template'
						'watch'
				]);
		}

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
