"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require("@angular/http/testing");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var api_service_1 = require("../api.service");
var helper = require("../tools/");
var SharedContracts = require("../contracts/");
var Adapter = require("./adapter/");
var base_1 = require("./adapter/base");
var Backend = (function (_super) {
    __extends(Backend, _super);
    function Backend(apiService, opt) {
        var _this = _super.call(this) || this;
        _this.apiService = apiService;
        _this.opt = opt;
        console.log({ opt: opt });
        var adapters = _this.initAdapters();
        _this.connections.subscribe(function (c) {
            var location = helper.getLocation(c.request.url);
            var request = {
                post: c.request.json(),
                get: location.search,
                location: location
            };
            var route = _this.apiService.detect(c.request.url);
            var adapter = _this.getAdapter(route, adapters);
            adapter.setRequest(request);
            if (typeof adapter[route.action] === 'undefined') {
                switch (c.request.method) {
                    case SharedContracts.RequestMethod.Get:
                        _this.response = adapter.get();
                        break;
                    case SharedContracts.RequestMethod.Post:
                        _this.response = adapter.post();
                        break;
                    case SharedContracts.RequestMethod.Delete:
                        _this.response = adapter.del();
                        break;
                    case SharedContracts.RequestMethod.Put:
                        _this.response = adapter.put();
                        break;
                }
                ;
            }
            else {
                _this.response = adapter[route.action]();
            }
            console.log({ method: c.request.method, adapter: adapter, request: request, res: _this.response, route: route });
            c.mockRespond(new http_1.Response(_this.response));
        });
        return _this;
    }
    Backend.prototype.initAdapters = function () {
        var res = {};
        for (var i in Adapter) {
            if (Adapter[i].Adapter) {
                res[i.toLowerCase()] = new Adapter[i].Adapter();
            }
            else {
                res[i.toLowerCase()] = new base_1.Base.Adapter();
            }
        }
        return res;
    };
    Backend.prototype.getAdapter = function (route, adapters) {
        var key;
        var rs;
        if (route) {
            key = route.module.toLowerCase();
            switch (route.module) {
                default:
                    rs = adapters[key];
            }
        }
        if (typeof rs === 'undefined') {
            console.error({ msg: 'Adapter undefined', url: this, adapters: adapters });
            rs = new base_1.Base.Adapter();
        }
        return rs;
    };
    return Backend;
}(testing_1.MockBackend));
Backend = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService, Object])
], Backend);
exports.Backend = Backend;
;
//# sourceMappingURL=backend.js.map