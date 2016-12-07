var barrels = {
'app/config': {main: 'index.js', defaultExtension: 'js'},
'app/shared/contracts': {main: 'index.js', defaultExtension: 'js'},
'app/shared/service': {main: 'index.js', defaultExtension: 'js'},
'app/shared': {main: 'index.js', defaultExtension: 'js'},
'app/shared/tools': {main: 'index.js', defaultExtension: 'js'},
'app/shared/mocks/contracts': {main: 'index.js', defaultExtension: 'js'},
'app/shared/mocks/data': {main: 'index.js', defaultExtension: 'js'},
'app/shared/mocks': {main: 'index.js', defaultExtension: 'js'},
'app/shared/mocks/adapter': {main: 'index.js', defaultExtension: 'js'},
'app/layout': {main: 'index.js', defaultExtension: 'js'},
'app/layout/fileupload': {main: 'index.js', defaultExtension: 'js'},
'app/layout/filter': {main: 'index.js', defaultExtension: 'js'},
'app/pages': {main: 'index.js', defaultExtension: 'js'},
'app/pages/dashboard': {main: 'index.js', defaultExtension: 'js'},
'app/widgets': {main: 'index.js', defaultExtension: 'js'},
'app/widgets/_blank': {main: 'index.js', defaultExtension: 'js'},

};
var cnf = {
    map: {
        vendors: {
            'moment': 'unpkg:moment/moment.js',
            'ng2-datepicker': 'unpkg:ng2-datepicker@2.0.0-dev5/bundle/ng2-datepicker.umd.js',
            'ng2-file-upload': 'npm: ng2-file-upload',
            'query-string-parser': 'unpkg:query-string-parser',
            'check-types': 'unpkg:check-types/src/check-types.min.js',
            'strict-uri-encode': 'unpkg:strict-uri-encode',
            'object-assign': 'unpkg:object-assign',
            'query-string': 'unpkg:query-string',
            '@angular/core': 'npm: @angular/core/bundles/core.umd.js',
            '@angular/common': 'npm: @angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm: @angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm: @angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm: @angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm: @angular/http/bundles/http.umd.js',
            '@angular/router': 'npm: @angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm: @angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm: @angular/upgrade/bundles/upgrade.umd.js',
            'rxjs': 'npm: rxjs',
            'jquery': 'https://code.jquery.com/jquery-3.1.1.min.js',
            'lodash': 'unpkg:lodash',
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
            'ng2-file-upload': { defaultExtension: 'js' },
            rxjs: { main: 'index.js', defaultExtension: 'js' },
        }
    }
};
System.config({
    defaultJSExtensions: false,
    paths: {
        'npm: ': '../../node_modules/',
        'unpkg:': 'https://unpkg.com/',
        'bower: ': 'bower_components/'
    },
    map: Object.assign({
        app: 'app',
    }, cnf.map.vendors),
    packages: Object.assign({}, cnf.packages.vendors, barrels)
});
//# sourceMappingURL=systemjs.configs.js.map