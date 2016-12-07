"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require("rxjs/add/operator/toPromise");
var Base = require("./base");
var _1 = require("../tools/");
var Factory = (function () {
    function Factory(http, api) {
        this.http = http;
        this.api = api;
    }
    Factory.prototype.get = function (service) {
        return new service(this.http, this.api);
    };
    return Factory;
}());
exports.Factory = Factory;
var ServiceBasic = (function (_super) {
    __extends(ServiceBasic, _super);
    function ServiceBasic() {
        return _super.apply(this, arguments) || this;
    }
    ServiceBasic.prototype.create = function (reqArg) {
        return this.post('create', reqArg);
    };
    ServiceBasic.prototype.list = function (reqArg) {
        return this.get('list', _1.AppValidators.list().set(reqArg));
    };
    return ServiceBasic;
}(Base.Service));
exports.ServiceBasic = ServiceBasic;
//# sourceMappingURL=index.js.map