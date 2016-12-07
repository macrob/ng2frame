"use strict";
var forms_1 = require("@angular/forms");
var regexps_1 = require("./regexps");
var _ = require('lodash');
var check = require('check-types');
var NgForm;
(function (NgForm) {
    NgForm.amount = forms_1.Validators.pattern('^' + regexps_1.Regexps.amount + '$');
    NgForm.findNumber = forms_1.Validators.pattern(regexps_1.Regexps.findNumber);
    NgForm.idNumber = forms_1.Validators.pattern('^[0-9]+$');
})(NgForm = exports.NgForm || (exports.NgForm = {}));
var Validator;
(function (Validator_1) {
    var Validator = (function () {
        function Validator(data, isScalar) {
            if (isScalar === void 0) { isScalar = false; }
            this.data = data;
            this.isScalar = isScalar;
            this.isRequire = false;
        }
        Validator.prototype.append = function () {
            var opt = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opt[_i] = arguments[_i];
            }
            Object.assign.apply(Object, [this.data].concat(opt));
            return this;
        };
        Validator.prototype.prepare = function (data) {
            var req = data;
            switch (true) {
                case check.not.undefined(this.data.type) && this.isScalar:
                    if (check.undefined(req)) {
                        req = this.defaultValue;
                    }
                    if (check.undefined(req) && this.data.type === 'lists' && this.isRequire) {
                        req = [];
                    }
                    if (check.not.undefined(req)) {
                        switch (this.data.type) {
                            case 'string':
                                req = req.toString();
                                break;
                            case 'number':
                                req = check.number(parseFloat(req)) ? parseFloat(req) : this.defaultValue;
                                break;
                            case 'findnumber':
                                req = req.toString();
                                break;
                            case 'any':
                                break;
                            case 'lists':
                                var lists_1 = [];
                                req = check.array(req) ? req : [req];
                                _.each(this.data.values, function (validator, ind) {
                                    lists_1.push(validator.get(req[ind]));
                                });
                                req = lists_1;
                                break;
                            case 'enum':
                                break;
                        }
                    }
                    break;
                default:
                    req = _.pick(req, _.keys(this.data));
                    _.each(this.data, function (validator, properties) {
                        switch (true) {
                            case check.not.undefined(validator.isValid):
                                req[properties] = validator.get(req[properties]);
                                break;
                        }
                    });
                    req = _.pickBy(req, function (el) {
                        return _.isUndefined(el) === false;
                    });
            }
            return req;
        };
        Validator.prototype.get = function (req) {
            return this.prepare(req);
        };
        Validator.prototype.set = function (data) {
            this.requestValues = this.prepare(data);
            return this;
        };
        Validator.prototype.getData = function () {
            return this.requestValues;
        };
        Validator.prototype.isValid = function (req) {
            req = req ? this.prepare(req) : this.requestValues;
            var rs = this.validation(req);
            return rs;
        };
        Validator.prototype.validation = function (req) {
            var rs = true;
            var results = {};
            switch (true) {
                case check.not.undefined(this.data.type) && this.isScalar:
                    if (this.isRequire) {
                        rs = rs && check.not.undefined(req);
                    }
                    if (check.not.undefined(req)) {
                        switch (this.data.type) {
                            case 'string':
                                rs = rs && check.string(req);
                                break;
                            case 'number':
                                rs = rs && check.number(req);
                                break;
                            case 'findnumber':
                                rs = rs && new RegExp(regexps_1.Regexps.findNumber).test(req);
                                break;
                            case 'any':
                                break;
                            case 'lists':
                                rs = rs && check.array(req);
                                if (rs) {
                                    _.each(this.data.values, function (validator, ind) {
                                        rs = rs && validator.validation(req[ind]);
                                    });
                                }
                                break;
                            case 'enum':
                                rs = rs && check.not.undefined(this.data.values[req]) && check.not.undefined(this.data.values[this.data.values[req]]);
                                break;
                        }
                    }
                    break;
                default:
                    req = _.pick(req, _.keys(this.data));
                    _.each(this.data, function (validator, properties) {
                        switch (true) {
                            case check.not.undefined(validator.isValid):
                                results[properties] = {
                                    property: properties,
                                    isValid: validator.validation(req[properties])
                                };
                                break;
                            default:
                                throw { msg: 'uknownr' };
                        }
                    });
            }
            this.lastValidation = {
                request: req,
                results: results
            };
            rs = rs && _.every(results, { isValid: true });
            return rs;
        };
        Validator.prototype.require = function () {
            this.isRequire = true;
            return this;
        };
        Validator.prototype.default = function (value) {
            this.defaultValue = value;
            return this;
        };
        return Validator;
    }());
    Validator_1.Validator = Validator;
    function create(cnf, scalar) {
        if (scalar === void 0) { scalar = false; }
        return new Validator(cnf, scalar);
    }
    Validator_1.create = create;
    function string() {
        return create({
            type: 'string'
        }, true);
    }
    Validator_1.string = string;
    ;
    function number() {
        return create({
            type: 'number'
        }, true);
    }
    Validator_1.number = number;
    ;
    function findNumber() {
        return create({
            type: 'findnumber'
        }, true);
    }
    Validator_1.findNumber = findNumber;
    ;
    function list(values) {
        return create({
            type: 'enum',
            values: values
        }, true);
    }
    Validator_1.list = list;
    ;
    function any() {
        return create({
            type: 'any'
        }, true);
    }
    Validator_1.any = any;
    ;
    function lists() {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        return create({
            type: 'lists',
            values: validators
        }, true);
    }
    Validator_1.lists = lists;
    ;
})(Validator = exports.Validator || (exports.Validator = {}));
var AppValidators;
(function (AppValidators) {
    function list() {
        return Validator.create({
            find: Validator.any(),
            opt: Validator.any(),
            period: Validator.any(),
            limit: Validator.lists(Validator.number().default(0), Validator.number().default(50)).require()
        });
    }
    AppValidators.list = list;
    ;
    AppValidators.LIST = Validator.create({
        find: Validator.any(),
        opt: Validator.any(),
        period: Validator.any()
    });
})(AppValidators = exports.AppValidators || (exports.AppValidators = {}));
//# sourceMappingURL=validators.js.map