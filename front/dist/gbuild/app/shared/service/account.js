"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = require("./base");
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super.apply(this, arguments) || this;
        _this.module = 'account';
        return _this;
    }
    return Service;
}(Base.Service));
exports.Service = Service;
//# sourceMappingURL=account.js.map