"use strict";
var http_1 = require("@angular/http");
var moment = require("moment");
var Service = (function () {
    function Service(http, api) {
        this.http = http;
        this.api = api;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    Service.prototype.get = function (moduleAction, params) {
        return this.request(this.getRoute(moduleAction), params, 'get');
    };
    Service.prototype.post = function (moduleAction, params) {
        return this.request(this.getRoute(moduleAction), params, 'post');
    };
    Service.prototype.getRoute = function (route, module) {
        module = module ? module : this.module;
        if (!this.api.get(module)) {
            throw "Module Route in api not found " + module;
        }
        if (!this.api.get(module)[route]) {
            throw "Module Route in api not found " + module + " " + route;
        }
        return this.api.get(module)[route].url;
    };
    Service.prototype.isValid = function (req) {
        return new Promise(function (res, rej) {
            if (typeof req === 'undefined') {
                res(req);
                return true;
            }
            if (typeof req.isValid === 'undefined') {
                res(req);
                return true;
            }
            if (req.isValid()) {
                res(typeof req.getData === 'undefined' ? req : req.getData());
            }
            else {
                rej({ msg: 'Validation Error', error: 'validation', req: req });
            }
        });
    };
    Service.prototype.query = function (url, params, method) {
        var _this = this;
        if (method === void 0) { method = 'get'; }
        return this.isValid(params).then(function (data) {
            var rs;
            switch (method) {
                case 'get':
                    rs = _this.http[method](url, {
                        headers: _this.headers,
                        search: $.param(data)
                    });
                    break;
                default:
                    rs = _this.http[method](url, data, {
                        headers: _this.headers
                    });
            }
            ;
            return rs;
        });
    };
    Service.prototype.requestDataToQuary = function (data) {
        var check = require('check-types');
        var find = {};
        var limit = {};
        var period = {};
        if (data.find) {
            find = data.find;
        }
        if (data.limit) {
            limit = {
                page: data.limit[0],
                limit: data.limit[1]
            };
        }
        if (data.period) {
            if (check.assigned(data.period.length)) {
                period = {
                    sdt: moment(data.period[0]).format('DD-MM-YYYY'),
                    edt: moment(data.period[1]).format('DD-MM-YYYY')
                };
            }
            else {
                period = {
                    dt: moment(data.period).format('DD-MM-YYYY'),
                };
            }
        }
        return $.param(Object.assign({}, find, limit, period));
    };
    Service.prototype.request = function (url, params, method) {
        var _this = this;
        if (method === void 0) { method = 'get'; }
        return this.isValid(params).then(function (data) {
            var rs;
            switch (method) {
                case 'get':
                    rs = _this.http[method](url, {
                        headers: _this.headers,
                        search: _this.requestDataToQuary(data)
                    });
                    break;
                default:
                    rs = _this.http[method](url, data, {
                        headers: _this.headers
                    });
            }
            ;
            return rs.toPromise().then(function (response) {
                return response.json();
            });
        });
    };
    Service.prototype.handleError = function (err) {
        return true;
    };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=base.js.map