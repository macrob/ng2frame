module.exports = function(cnf) {


	var defaultOptions = {
		'target': 'es6',
		'module': 'commonjs',
		'emitDecoratorMetadata': true,
		'experimentalDecorators': true,
		'sourceMap': true,
		'noEmitHelpers': false,
		'listFiles': true,
		'noImplicitAny': false,
		'allowUnreachableCode': false,
		'noLib': false,
		"moduleResolution": "classic",
		// 'rootDir': cnf.srcApp,
		allowSyntheticDefaultImports: true,
		"rootDir": "src/app/",
		'outDir':  cnf.build
	};


	return {
		app: {
			tsconfig: false,
			options: defaultOptions,
			files: [{
				src: [

					cnf.ts.app.src + '/**/*.ts',
					'!'+ cnf.ts.appModule.src + '/**/*.ts',
					'!'+ cnf.ts.app.src + '/**/*.spec.ts'

				],
				// dest: cnf.build + '/app/'
				dest: cnf.ts.app.dest
			}],
			exclude: [
				'node_modules',
				// '**/*.spec.ts'
			]
		},
		appModule: {
			tsconfig: false,
			options: defaultOptions,
			files: [{
				src: [

					cnf.ts.appModule.src + '/**/*.ts',
					'!'+ cnf.ts.appModule.src + '/**/*.spec.ts'
				],
				dest: cnf.ts.appModule.dest
			}],
			exclude: [
				'node_modules',
				// '**/*.spec.ts'
			]
		},
		/* karma units tests ts */
		spec: {
			tsconfig: false,
			options: defaultOptions,
			files: [{
				src: [

					cnf.ts.app.src + '/**/*.d.ts',
					cnf.ts.app.src + '/**/*.spec.ts'

				],
				// dest: cnf.build + '/app/'
				dest: cnf.ts.app.dest
			}],
			exclude: [
				'node_modules',
				// '**/*.spec.ts'
			]
		},

		/* Protractor tests ts */
		e2e: {
			tsconfig: false,
			files: [{
				src: [
					'e2e/**/*.e2e.ts'
				],
				dest: cnf.e2eBuild
			}],
			options: Object.assign({}, defaultOptions, {
				rootDir: 'e2e/'
			}),
			'exclude': [
				'node_modules',
			],
		}
	};
};
