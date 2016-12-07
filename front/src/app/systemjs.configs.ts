
declare var System: any;
/* GENERATE BY config/_utils/barrels.js */
var barrels = {};

const cnf = {
	map: {
		vendors: {
			// 'ng2-datepicker': 'unpkg:ng2-datepicker@1.1.1/',
			// 'ng2-datepicker': 'npm: ng2-datepicker/',
			// 'ng2-datepicker': 'unpkg:ng2-datepicker/',
			'moment': 'unpkg:moment/moment.js',
			'ng2-datepicker': 'unpkg:ng2-datepicker@2.0.0-dev5/bundle/ng2-datepicker.umd.js',
			'ng2-file-upload': 'npm: ng2-file-upload',
			// 'typescript': 'npm:typescript@2.0.2/lib/typescript.js',
	    //
	    // 'moment': 'npm:moment/moment.js',
			// 'moment': 'unpkg:moment',
			// 'traceur': 'unpkg:traceur',
			// 'ng2-datepicker.component.html': 'unpkg:/ng2-datepicker@1.1.1/src/components/ng2-datepicker.component.html',
		// angular bundles
			// 'angular2-in-memory-web-api': 'unpkg:angular2-in-memory-web-api/index.js',
			//
			// 'lolcation': 'unpkg:url-parse/lolcation.js',
			// 'url-parse': 'unpkg:url-parse',
			// 'requires-port': 'unpkg:requires-port',
			// 'querystringify': 'unpkg:querystringify',
			// 'qs': 'unpkg:qs',
			// 'stringify': 'unpkg:qs/stringify/src/stringify',
			// 'parse': 'unpkg:parse/lib/browser/Parse.js',
			// 'formats': 'unpkg:qs/formats',
			// 'validators': 'unpkg:validators/lib/',
			// 'querystringify': 'unpkg:querystringify',
			'query-string-parser': 'unpkg:query-string-parser',

			// https://unpkg.com/check-types@7.0.1/src/check-types.min.js
			// 'check-types': 'bower: check-types/src/check-types.min.js',
			'check-types': 'unpkg:check-types/src/check-types.min.js',

			'strict-uri-encode': 'unpkg:strict-uri-encode',
			'object-assign': 'unpkg:object-assign',
			'query-string': 'unpkg:query-string',

			// '@angular/core': 'unpkg:@angular/core/bundles/core.umd.js',
			// '@angular/common': 'unpkg:@angular/common/bundles/common.umd.js',
			// '@angular/compiler': 'unpkg:@angular/compiler/bundles/compiler.umd.js',
			// '@angular/platform-browser': 'unpkg:@angular/platform-browser/bundles/platform-browser.umd.js',
			// '@angular/platform-browser-dynamic': 'unpkg:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			// '@angular/http': 'unpkg:@angular/http/bundles/http.umd.js',
			// '@angular/router': 'unpkg:@angular/router/bundles/router.umd.js',
			// '@angular/forms': 'unpkg:@angular/forms/bundles/forms.umd.js',
			// '@angular/upgrade': 'unpkg:@angular/upgrade/bundles/upgrade.umd.js',
			'@angular/core': 'npm: @angular/core/bundles/core.umd.js',
			'@angular/common': 'npm: @angular/common/bundles/common.umd.js',
			'@angular/compiler': 'npm: @angular/compiler/bundles/compiler.umd.js',
			'@angular/platform-browser': 'npm: @angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic': 'npm: @angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/http': 'npm: @angular/http/bundles/http.umd.js',
			'@angular/router': 'npm: @angular/router/bundles/router.umd.js',
			'@angular/forms': 'npm: @angular/forms/bundles/forms.umd.js',
			'@angular/upgrade': 'npm: @angular/upgrade/bundles/upgrade.umd.js',
			// other libraries
			// 'rxjs':											'unpkg:rxjs',
			'rxjs':		'npm: rxjs',
			// 'rxjs':											'bower: rxjs/dist/rx.min.js',
			'jquery': 'https://code.jquery.com/jquery-3.1.1.min.js',
			// 'jQuery': 'npm: jquery',
			// '$': 'unpkg:jquery',
			'lodash': 'unpkg:lodash',

			// '@angular/core/testing': 'unpkg:@angular/core/bundles/core-testing.umd.js',
			// '@angular/common/testing': 'unpkg:@angular/common/bundles/common-testing.umd.js',
			// '@angular/compiler/testing': 'unpkg:@angular/compiler/bundles/compiler-testing.umd.js',
			// '@angular/platform-browser/testing': 'unpkg:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
			// '@angular/platform-browser-dynamic/testing': 'unpkg:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
			// '@angular/http/testing': 'unpkg:@angular/http/bundles/http-testing.umd.js',
			// '@angular/router/testing': 'unpkg:@angular/router/bundles/router-testing.umd.js',
			// '@angular/forms/testing': 'unpkg:@angular/forms/bundles/forms-testing.umd.js',
			'@angular/core/testing': 'npm: @angular/core/bundles/core-testing.umd.js',
			'@angular/common/testing': 'npm: @angular/common/bundles/common-testing.umd.js',
			'@angular/compiler/testing': 'npm: @angular/compiler/bundles/compiler-testing.umd.js',
			'@angular/platform-browser/testing': 'npm: @angular/platform-browser/bundles/platform-browser-testing.umd.js',
			'@angular/platform-browser-dynamic/testing': 'npm: @angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
			'@angular/http/testing': 'npm: @angular/http/bundles/http-testing.umd.js',
			'@angular/router/testing': 'npm: @angular/router/bundles/router-testing.umd.js',
			'@angular/forms/testing': 'npm: @angular/forms/bundles/forms-testing.umd.js',
		}
	},
	packages: {
		vendors: {
			app: { main: './index.js', defaultExtension: 'js' },
			'ng2-file-upload': {defaultExtension: 'js' },
			rxjs: { main: 'index.js', defaultExtension: 'js' },
			// lodash: { main: 'index.js', defaultExtension: 'js' },
			// 'angular-in-memory-web-api': { main: './index.js', defaultExtension: 'js' },
		}
	}
};

// (function (global) {
	System.config({
		// baseURL: '/dist/gbuild/',
		// baseURL: '/base/',
		defaultJSExtensions: false,

		paths: {
			// 'npm: ': '../../node_modules/',
			// 'npm: ': '../../node_modules/',
			'npm: ': '../../node_modules/',
			'unpkg:': 'https://unpkg.com/',
			'bower: ':  'bower_components/'
		},

		// map tells the System loader where to look for things
		map: (<any> Object).assign({
			app: 'app',
		}, cnf.map.vendors),

		// packages tells the System loader how to load when no filename and/or no extension
		packages: (<any> Object).assign({}, cnf.packages.vendors, barrels)
	});
// })(this);
