const path = require('path');

module.exports = function(cnf) {
    var _ = require('lodash');

    var tasks = {
        template: {
            files: [
                cnf.srcTpl + '**/*.html',
                cnf.srcTpl + '**/*.js',
                cnf.srcTpl + '**/*.css',
                cnf.srcTpl + '**/*.md',
                cnf.srcTpl + '**/*.xml',
                cnf.srcTpl + '**/*.ico',
                cnf.srcTpl + '**/*.txt',
                cnf.srcTpl + '**/*.png'
            ],
            tasks: [
                'copy:template'
            ]
        },
        app: {
            files: ['src/app/**/*.js', 'src/app/**/*.css', 'src/app/**/*.html'],
            tasks: [
                'copy:app'
            ]
        },
        ts: {
            // files: ['src/app/**/*.ts', '!src/app/**/*.spec.ts'],
			// files: [cnf.ts.app.src + '/**/*.!(spec.)ts'],
            files: [
                cnf.ts.app.src + '/**/*.ts',
                '!'+ cnf.ts.appModule.src + '/**/*.ts',
                '!'+ cnf.ts.app.src + '/**/*.spec.ts'
            ],
            tasks: [
                'tslint',
                'ts:app',
                'exec:barrels'
            ]
        },
        tsModule: {

            files: [
                cnf.ts.appModule.src + '/**/*.ts',
                '!'+ cnf.ts.appModule.src + '/**/*.spec.ts'
            ],
            tasks: [
                'tslint',
                'ts:appModule',
                'exec:barrels'
            ]
        },
        spec: {
            files: [cnf.karma.tsSrc + '/**/*.spec.ts'],
            tasks: [
                // 'tslint',
                'clean:spec',
                'ts:spec',
                'exec:infoKarma'
            ]
        },
        e2e: {
            files: ['e2e/**/*.ts'],

            tasks: [
                'clean:e2e',
                'ts:e2e',
            ]
        },
        karmaRestart: {
            files: ['config/karma/karma.conf.js'],
            tasks: [
                // 'karma:unit:restart'
                'karma:unit:stop',
                'karma:unit:start'
            ]
        }
    };

    tasks.protractor = {
        // files: _.union(tasks.template.files, tasks.ts.files, tasks.app.files, tasks.e2e.files),
        files: [cnf.build + '/**/*.js', cnf.build + '/**/*.html', cnf.e2eBuild + '/**/*.js'],
        tasks: [
        'exec:protractor'
				// 'protractor'
        ]
    };

    // tasks.karma = {
    //     files: _.union(tasks.ts.files, tasks.app.files, tasks.spec.files),
    //     tasks: [
    //     'karma:unit:run'
    //     ]
    // };
    tasks.karma = {
        files: [cnf.build + '/app/**/*.js', cnf.build + '/app/**/*.html'],
		// files: [cnf.karma.tsDist + '/**/*.js', cnf.karma.tsDist + '/app/**/*.html'],
        tasks: [
        'karma:unit:run'
        ]
    };


    var utilsTasks = [
        'exec:info',
        'todo'
    ];

    return {
        // 'app-karma-e2e': {
        //     files: _.union(tasks.template.files, tasks.ts.files, tasks.spec.files, tasks.app.files, tasks.e2e.files),
        //     tasks: _.union(tasks.template.tasks, tasks.ts.tasks, tasks.spec.tasks, tasks.app.tasks, tasks.e2e.tasks, utilsTasks),
        //     // template: tasks.template,
        //     // ts:  tasks.ts,
        //     // spec: tasks.spec,
        //     // app: tasks.app,
        //     // e2e: tasks.e2e
        //
        // },
        // 'app-karma': {
        //     files: _.union(tasks.template.files, tasks.ts.files, tasks.spec.files, tasks.app.files),
        //     tasks: _.union(tasks.template.tasks, tasks.ts.tasks, tasks.spec.tasks, tasks.app.tasks, utilsTasks),
        // },
        // app: {
        //     files: _.union(tasks.template.files, tasks.ts.files, tasks.app.files),
        //     tasks: _.union(tasks.template.tasks, tasks.ts.tasks, tasks.app.tasks, utilsTasks),
        // },
        template: tasks.template,
        ts: tasks.ts,
        tsModule: tasks.tsModule,
        spec: tasks.spec,
        e2e: tasks.e2e,
        appAssets: tasks.app,
        karma: tasks.karma,
        // karmaRestart: tasks.karmaRestart,
        protractor: tasks.protractor,

    }
}

//
//
// 'buildE2e': {
//     files: [
//         cnf.srcTpl + '**/*.html', cnf.srcTpl + '**/*.js', cnf.srcTpl + '**/*.css', cnf.srcTpl + '**/*.md', cnf.srcTpl + '**/*.xml', cnf.srcTpl + '**/*.ico', cnf.srcTpl + '**/*.txt', cnf.srcTpl + '**/*.png',
//         'e2e/**/*.ts',
//         'src/app/**/*.ts', '!src/app/**/*.spec.ts'
//     ],
//
//     tasks: [
//         'copy:template',
//
//         'ts:e2e',
//
//         // 'tslint',
//         'ts:app',
//         // 'todo',
//
//         'protractor'
//     ]
// },
// js: {
//     files: ['src/**/*.js'],
//
//     tasks: [
//         'copy:js'
//     ]
// },
// sass: {
//     files: ['src/**/*.scss'],
//
//     tasks: [
//         'sass'
//     ]
// },
// 'html-index': {
//     files: ['src/*.html'],
//
//     tasks: [
//         'copy:html-index', 'rename:html-index'
//     ]
// },
// 'karma-conf': {
//     files: ['config/karma/*.js'],
//
//     tasks: [
//         'copy:karma'
//     ]
// }
