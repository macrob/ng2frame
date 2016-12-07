"use strict";
var testing_1 = require("@angular/http/testing");
var testing_2 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var _1 = require("./mocks/");
var api_service_1 = require("./api.service");
var _2 = require("./service/");
var _3 = require("../config/");
var _ = require('lodash');
var Providers;
(function (Providers) {
    Providers.FAKE_BACKEND = [
        http_1.BaseRequestOptions,
        testing_1.MockBackend,
        {
            provide: _1.Backend,
            useFactory: function (opt) {
                return new _1.Backend(new api_service_1.ApiService(_3.CONFIG.api.baseUrl), opt);
            }
        },
        {
            provide: http_1.Http,
            useFactory: function (backend, defaultOptions) {
                return new http_1.Http(backend, defaultOptions);
            },
            deps: [_1.Backend, http_1.BaseRequestOptions]
        }
    ];
    Providers.FACTORY = {
        provide: _2.Factory,
        useFactory: function (http) {
            return new _2.Factory(http, new api_service_1.ApiService(_3.CONFIG.api.baseUrl));
        },
        deps: [http_1.Http]
    };
})(Providers = exports.Providers || (exports.Providers = {}));
var TestBed;
(function (TestBed) {
    function provideIt() {
        var opt = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opt[_i] = arguments[_i];
        }
        return _.union.apply(_, opt);
    }
    TestBed.provideIt = provideIt;
    function declareIt(opt) {
        return _.union({}, opt);
    }
    TestBed.declareIt = declareIt;
    function importsIt(opt) {
        return _.union({}, opt);
    }
    TestBed.importsIt = importsIt;
    function configure(_a) {
        var backend = _a.backend, providers = _a.providers, declarations = _a.declarations, imports = _a.imports;
        var conf = {};
        if (typeof providers !== 'undefined' || typeof backend !== 'undefined') {
            providers = providers ? providers : [];
            backend = backend ? backend : [];
            conf.providers = provideIt(_.union(backend, providers));
        }
        if (typeof declarations !== 'undefined') {
            conf.declarations = declareIt(declarations);
        }
        if (typeof imports !== 'undefined') {
            conf.imports = importsIt(imports);
        }
        return testing_2.TestBed.configureTestingModule(conf);
    }
    TestBed.configure = configure;
})(TestBed = exports.TestBed || (exports.TestBed = {}));
//# sourceMappingURL=app.bootstrap.js.map