const path = require('path');

const config = require('config');
const debug = require('debug')('grunt:cnf:gruntfile.js');

console.log('To show debug info set DEBUG="grunt*"');
console.log(' set -x DEBUG \'grunt*\'');


let CONF = {
	template: 'html5-boilerplate',
}



let build = path.resolve('.', 'dist', 'gbuild');


let cnf = {
		srcApp: path.resolve('.', 'src', 'app'),
		srcTpl: path.resolve('.', 'src', CONF.template),
		root: path.resolve('.'),
		build: build,

		e2eBuild: path.resolve('.', 'dist', 'e2e'),
		e2eIsActive: /e2e/.test(process.argv[2]),

		seleniumPort: config.get('selenium.port'),
		seleniumHost: config.get('selenium.host'),

		httpPort: config.get('http.port'),
		httpHost: config.get('http.host'),

		karmaPort: config.get('karma.port'),
		karmaHost: config.get('karma.host'),

		tests: config.get('tests'),

		karma: {
				module: '',
				src: 'app/',
				tsSrc: path.resolve('.', 'src', 'app'),
				tsDist: path.resolve(build, 'app')
		},
		sass: {
				template: {
						src: path.resolve('.', 'src', CONF.template, 'scss'),
						dest: path.resolve(build, 'css')
				}
		},
		npm: {
			src: path.resolve('.', 'node_modules'),
			dest: build
		}
};

/* karma conf */
// cnf.karma.src = 'app/';
let tasks;
switch (true) {
		case process.env.karmaOpt !== undefined:
				cnf.karma.module = process.env.karmaOpt;
				cnf.karma.src += process.env.karmaOpt + '/';
				cnf.karma.tsSrc += process.env.karmaOpt + '/';
				break;
		case /^q?hot:app-karma/.test(process.argv[2]):
				tasks = process.argv[2].split(':');

				if (tasks.length === 3) {
						cnf.karma.src += tasks[2] + '/';
						cnf.karma.tsSrc += tasks[2] + '/';
						cnf.karma.module = tasks[2];
						// cnf.karma.tsDist +=  tasks[2] + '/';

						process.env.karmaOpt = tasks[2];
				}
				break;
				// case /^q?hot:app/.test(process.argv[2]):
				// 	tasks = process.argv[2].split(':');
				//
				// 	if (tasks.length === 3) {
				// 		cnf.karma.src +=  tasks[2] + '/';
				// 		cnf.karma.tsSrc +=  tasks[2] + '/';
				// 		cnf.karma.module =  tasks[2];
				// 		// cnf.karma.tsDist +=  tasks[2] + '/';
				//
				// 		process.env.karmaOpt = tasks[2];
				// 	}
				// break;
}

cnf.ts = {
		app: {
				src: cnf.srcApp,
				dest: cnf.build + '/app/'
		},
		appModule: {
				src: cnf.srcApp + '/' + cnf.karma.module + '/',
				dest: cnf.build + '/app/'
		},
		spec: {
				src: cnf.karma.tsSrc,
				dest: cnf.build + '/app/',
		}
};

process.env.karmaTestsRoot = cnf.karma.src;
debug(cnf);

module.exports = function(grunt) {
		'use strict';

		grunt.initConfig({
				watch: require('./config/grunt/watch.js')(cnf),

				tslint: require('./config/grunt/tslint.js'),
				todo: require('./config/grunt/todo.js'),
				copy: require('./config/grunt/copy.js')(cnf),
				clean: require('./config/grunt/clean.js')(cnf),
				'http-server': require('./config/grunt/http-server.js')(cnf),
				browserSync: require('./config/grunt/browserSync.js')(cnf),

				/*
				ts:app - compile app ts files
				ts:spec - compile spec ts files
				ts: e2e - e2e app ts files
				*/
				ts: require('./config/grunt/ts.js')(cnf),


				/* End 2 end testing */
				webdrivermanager: require('./config/grunt/webdrivermanager.js')(cnf),
				protractor: require('./config/grunt/protractor.js')(cnf),

				/* KARMA UNIT TEST CNF */
				karma: require('./config/grunt/karma.js')(cnf),

				exec: require('./config/grunt/exec.js')(cnf),

				sass: {
						template: require('./config/grunt/sass.js')(cnf.sass.template),
				},

				replace: {
						dist: {
								options: {
										patterns: [{
												json: config.get('app')

										}]
								},
								files: [{
										expand: true,
										flatten: true,
										src: [cnf.build + '/app/config/index.js'],
										dest: cnf.build + '/app/config/'
								}]
						}
				}

		});

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

		grunt.loadNpmTasks('grunt-exec');
		// grunt.loadNpmTasks('grunt-concurrent');


		grunt.loadNpmTasks('grunt-replace');

		grunt.registerTask('server:background', [
				// 'http-server:background'
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

				'exec:barrels',
				'compile:bower'
		]);


		grunt.registerTask('compile:template', [
				'sass:template',
				'copy:template',
		]);

		//
		// grunt.registerTask('compile:templateSing', [
		// 	'sass:templateSing',
		// 	'copy:templateSing',
		// ]);

		grunt.registerTask('compile:bower', [
				'copy:bower',
		]);

		grunt.registerTask('compile:spec', [
				'exec:nodeModules',
				'ts:spec',
				'copy:karma',
				'karma'
		]);

		grunt.registerTask('compile:e2e', [
				'clean:e2e',
				'ts:e2e',
				'protractor'
		]);

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
				// 'exec:info',
				// 'todo',
				// 'watch:app'
				'watch:ts'
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
				/* karma */
				'compile:spec',

				'server:background',
				// 'exec:info',
				// 'todo',
				// 'watch:app-karma'
				'watch'
		]);


		grunt.registerTask('hot:app-karma-e2e', [
				'compile:app',


				/* karma */
				'compile:spec',

				'server:background',
				'webdrivermanager:start',

				/* e2e protractor */
				'compile:e2e',

				'exec:info',
				'todo',
				// 'watch:app-karma-e2e'
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
};
