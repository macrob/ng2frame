"use strict";
var _1 = require("../config/");
var ApiService = (function () {
    function ApiService(baseUrl) {
        this.baseUrl = baseUrl;
        this.map = {};
        this.map = _1.apiMap;
    }
    ApiService.prototype.get = function (name, action) {
        if (this.map[name]) {
            var result = {};
            if (action) {
                return this.map[name][action].url;
            }
            for (var action_1 in this.map[name]) {
                result[action_1] = {};
                result[action_1].url = this.baseUrl + this.map[name][action_1].url;
            }
            return result;
        }
        else {
            return false;
        }
    };
    ApiService.prototype.detect = function (url) {
        var plainUrl = url.replace(this.baseUrl, '');
        plainUrl = plainUrl.replace(/\?.*$/, '');
        for (var name_1 in this.map) {
            for (var action in this.map[name_1]) {
                if (this.map[name_1][action].url === plainUrl) {
                    return {
                        module: name_1,
                        action: action
                    };
                }
            }
        }
    };
    return ApiService;
}());
exports.ApiService = ApiService;
;
//# sourceMappingURL=api.service.js.map