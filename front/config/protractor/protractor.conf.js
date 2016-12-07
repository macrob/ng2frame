var config = require('../default');

// let cnf = {
// 	build: 'dist/gbuild/',
// 	seleniumPort: config.get('selenium.port'),
// 	seleniumHost: config.get('selenium.host')
// };

// const path = require('path');
// const util = require('../util/index');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const cnf = {
		root: '../../',
		"host": config.selenium.host,
		"port": config.selenium.port,
		"build": config.e2e.build,
		// reportResult: config.get('tests.reports.protractor.results')
		reportResult: config.tests.reports.protractor.results
	}
	// console.log(util.build('app'));


const reporter = new HtmlScreenshotReporter({
	dest: cnf.reportResult,
	filename: 'e2e.html',
	cleanDestination: true,
	showSummary: true,
	showConfiguration: true,
	reportTitle: null,
	captureOnlyFailedSpecs: true,
	reportOnlyFailedSpecs: false,
	showQuickLinks: true,
	takeScreenshots: true,
	pathBuilder: function(currentSpec, suites, browserCapabilities) {
		// will return chrome/your-spec-name.png
		return browserCapabilities.get('browserName') + '/' + currentSpec.fullName;
	}
});



exports.config = {
	// directConnect: true,
	chromeDriver: '/usr/bin/chromedriver',
	seleniumAddress: 'http://' + cnf.host + ':' + cnf.port + '/wd/hub',
	// specs: [util.build('app') + '/**/*.e2e.js'],
	// specs: [util.build('app') + '/**/*.e2e.js'],
	// specs: [cnf.root + 'dist/' + cnf.build + '/app/**/*.e2e.js'],
	specs: [cnf.root + 'dist/' + cnf.build + '/**/*.e2e.js'],
	// /Users/macrob/private/alloy/front/dist/wbuild
	multiCapabilities: [{
		'browserName': 'phantomjs',
		'phantomjs.binary.path': require('phantomjs-prebuilt').path
		// shardTestFiles: true
	},
	// {
	// 	'browserName': 'chrome',
	// 	chromeOptions: {
	// 		binary: '/usr/bin/chromium-browser'
	// 		// shardTestFiles: true
	// 	}
	// }
	// , {
	// 	'browserName': 'firefox',
	// 	firefoxOptions: {
	// 		binary: '/usr/bin/firefox'
	// 		// shardTestFiles: true
	// 	}
	// }
],

	baseUrl: 'http://' + config.http.host + ':' + config.http.port,
	rootElement: 'body',

	beforeLaunch: function() {
		return new Promise(function(resolve) {
			reporter.beforeLaunch(resolve);
		});
	},

	// Assign the test reporter to each running instance
	onPrepare: function() {
		var width = 1300;
		var height = 1200;
		browser.driver.manage().window().setSize(width, height);
		jasmine.getEnv().addReporter(reporter);
		afterAll(function(done) {
			// browser.forkedInstances['secondBrowser'] = null;
			process.nextTick(done);
		});
		// ,
		// beforeAll(function () {
		// //   browser.forkedInstances['secondBrowser'] = browser.forkNewDriverInstance();
		// });
	},

	// Close the report after all tests finish
	afterLaunch: function(exitCode) {
		return new Promise(function(resolve) {
			reporter.afterLaunch(resolve.bind(this, exitCode));
		});
	},


	// ----- Options to be passed to minijasminenode -----
	jasmineNodeOpts: {
		// onComplete will be called just before the driver quits.
		onComplete: null,
		// If true, display spec names.
		isVerbose: true,
		// If true, print colors to the terminal.
		showColors: true,
		// If true, include stack traces in failures.
		includeStackTrace: false,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 10000
	},
	// jasmineNodeOpts: {
	// 	showColors: true,
	// 	defaultTimeoutInterval: 30000
	// },
	framework: 'jasmine2',
};
