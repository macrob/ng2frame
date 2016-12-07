"use strict";
var parser = require('query-string-parser');
function getLocation(href) {
    console.log(href);
    var match = href.match(/^((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?([^#]*|))?(#.*|)$/);
    return match && {
        protocol: match[2],
        host: match[3],
        hostname: match[4],
        port: match[5],
        pathname: match[6],
        search: match[8] ? parser.fromQuery(decodeURIComponent(match[8])) : {},
        hash: match[9],
    };
}
exports.getLocation = getLocation;
;
var EnumEx = (function () {
    function EnumEx() {
    }
    EnumEx.getNamesAndValues = function (e) {
        return EnumEx.getNames(e).map(function (n) { return ({ name: n, value: e[n] }); });
    };
    EnumEx.getNames = function (e) {
        return EnumEx.getObjValues(e).filter(function (v) { return typeof v === 'string'; });
    };
    EnumEx.getValues = function (e) {
        return EnumEx.getObjValues(e).filter(function (v) { return typeof v === 'number'; });
    };
    EnumEx.getObjValues = function (e) {
        return Object.keys(e).map(function (k) { return e[k]; });
    };
    return EnumEx;
}());
exports.EnumEx = EnumEx;
//# sourceMappingURL=helper.js.map