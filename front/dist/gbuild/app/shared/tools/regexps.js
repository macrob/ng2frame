"use strict";
var Regexps;
(function (Regexps) {
    Regexps.amount = '(-?\\s*[0-9]*((\\.[0-9]{1,2})?)|0)';
    Regexps.findNumber = '^((' + Regexps.amount + ')|(L(' + Regexps.amount + '))|(G(' + Regexps.amount + '))|(G(' + Regexps.amount + ')L(' + Regexps.amount + ')))$';
})(Regexps = exports.Regexps || (exports.Regexps = {}));
var check = require('check-types');
var RegexpExec;
(function (RegexpExec) {
    function findNumber(arg) {
        var regexGroups;
        var res = new RegExp(Regexps.findNumber).exec(arg);
        console.log({ res: res, arg: arg });
        regexGroups = { gte: 12 };
        if (check.not.undefined(res[regexGroups.gte])) {
            return { gte: parseFloat(res[regexGroups.gte]) };
        }
        regexGroups = { gte: 17, lte: 21 };
        if (check.not.undefined(res[regexGroups.lte]) && check.not.undefined(res[regexGroups.gte])) {
            return { gte: parseFloat(res[regexGroups.gte]), lte: parseFloat(res[regexGroups.lte]) };
        }
        regexGroups = { lte: 8 };
        if (check.not.undefined(res[regexGroups.lte])) {
            return { lte: parseFloat(res[regexGroups.lte]) };
        }
        regexGroups = { eq: 2 };
        if (check.not.undefined(res[regexGroups.eq])) {
            return { eq: parseFloat(res[regexGroups.eq]) };
        }
    }
    RegexpExec.findNumber = findNumber;
})(RegexpExec = exports.RegexpExec || (exports.RegexpExec = {}));
var RegexpExecToExp;
(function (RegexpExecToExp) {
    function findNumber(arg) {
        var res = RegexpExec.findNumber(arg);
        return function (arg) {
            var rs = true;
            if (check.not.undefined(res.eq)) {
                rs = rs && res.eq === arg;
            }
            ;
            if (check.not.undefined(res.lte)) {
                rs = rs && res.lte >= arg;
            }
            if (check.not.undefined(res.gte)) {
                rs = rs && res.gte <= arg;
            }
            return rs;
        };
    }
    RegexpExecToExp.findNumber = findNumber;
})(RegexpExecToExp = exports.RegexpExecToExp || (exports.RegexpExecToExp = {}));
//# sourceMappingURL=regexps.js.map