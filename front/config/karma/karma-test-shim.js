


var cnf = {
  build: 'gbuild',
	karma: 'karma/',
	app: 'app/'
};

// #docregion
// /*global jasmine, __karma__, window*/
// (function (global) {

Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for app testing.

// Uncomment to get full stacktrace output. Sometimes helpful, usually not.
// Error.stackTraceLimit = Infinity; //

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () { };

// console.log(window.__karma__.files);process.exit(1);
// console.log(Object.keys(window.__karma__.files));
var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);
// console.log(System);

// process.exit(1);

var map = {
    // '@angular/core/testing': 'unpkg:@angular/core/bundles/core-testing.umd.js',
    // '@angular/common/testing': 'unpkg:@angular/common/bundles/common-testing.umd.js',
    // '@angular/compiler/testing': 'unpkg:@angular/compiler/bundles/compiler-testing.umd.js',
    // '@angular/platform-browser/testing': 'unpkg:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    // '@angular/platform-browser-dynamic/testing': 'unpkg:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    // // '@angular/http/testing': 'unpkg:@angular/http/bundles/http-testing.umd.js',
    // '@angular/router/testing': 'unpkg:@angular/router/bundles/router-testing.umd.js',
    // '@angular/forms/testing': 'unpkg:@angular/forms/bundles/forms-testing.umd.js',

    // 'angular2-in-memory-web-api': 'unpkg:angular2-in-memory-web-api/index.js',
  };

var path = {
  // paths serve as alias
  // 'unpkg:': '../node_modules/'
  'unpkg:': 'https://unpkg.com/',
	// 'npm :': 'https://unpkg.com/'
};

// console.log(allSpecFiles);

Object.keys(window.__karma__.files).forEach( function(path) {
  // if (/(\.spec\.js)$/.test(path)) {
  //
  // }
  // console.log(/^.*\/(.*\.html)$/.test(path));
  var rs = path.match(/^\/base\/dist\/gbuild\/(.*\.html)$/);
  if (rs !== null) {
    map[rs[1]] = rs[0];
    path[rs[1]] = rs[0];
  }

});
// console.log(map, path);
System.config({
  // baseURL: '/',
  // baseURL: '/base',
	baseURL: '/base',
  // packages: {
  //   '/app/pages/dashboard/dashboard.html': '/base/app/pages/dashboard/dashboard.html'
  // },
  // baseURL: '/',
  // Extend usual application package list with test folder
  // packages: { 'testing': { main: 'index.js', defaultExtension: 'js' } },
  paths: path,
  map: map
  // Assume unpkg: is set in `paths` in systemjs.config
  // Map the angular testing umd bundles

});

System.import(cnf.app +  'systemjs.configs.js')
	// .then({paths:path})
  .then(initTestBed)
  .then(initTesting);


function initTestBed(){
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])

  .then(function (providers) {
    var coreTesting    = providers[0];
    var browserTesting = providers[1];

    coreTesting.TestBed.initTestEnvironment(
      browserTesting.BrowserDynamicTestingModule,
      browserTesting.platformBrowserDynamicTesting());
  })
}

// Import all spec files and start karma
function initTesting () {
  // console.log('fsdf');
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      // console.log(moduleName);
      return System.import(moduleName);
    })
  )
  .then(__karma__.start, __karma__.error);
}


function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {

  return /(\.spec\.js)$/.test(path);
}

function isBuiltFile(path) {
// console.log(path);
  // return /wbuild/.test(path);
  var rootPath = new RegExp(window.__karma__.config.grunt.testsRoot || 'app');

  // return rootPath.test(path) || true;
	return rootPath.test(path);
}
