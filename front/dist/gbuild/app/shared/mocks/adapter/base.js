"use strict";
var http_1 = require("@angular/http");
var _ = require('lodash');
var check = require('check-types');
var Base;
(function (Base) {
    var DbWrapper = (function () {
        function DbWrapper(db) {
            this.db = db;
        }
        DbWrapper.prototype.find = function (get) {
            if (get.find) {
                return _.filter(this.db, function (o) {
                    var rs = true;
                    _.each(get.find, function (value, key) {
                        switch (key) {
                            default:
                                rs = rs && o[key] == value;
                        }
                    });
                    return rs;
                });
            }
            else {
                return this.db;
            }
        };
        DbWrapper.prototype.findById = function (id) {
            var res = this.find({
                find: {
                    id: id
                }
            });
            return typeof res.length !== 'undefined' && res.length > 0 ? res[0] : null;
        };
        DbWrapper.prototype.findOne = function (get) {
            var res = this.find(get);
            return typeof res.length !== 'undefined' && res.length > 0 ? res[0] : null;
        };
        DbWrapper.prototype.getId = function () {
            var rs = _.last(this.db);
            return rs ? rs.id + 1 : 1;
        };
        DbWrapper.prototype.create = function (item) {
            item.id = this.getId();
            item.dt = new Date();
            this.db.push(item);
            return item;
        };
        DbWrapper.prototype.update = function (item) {
            var ind = _.findIndex(this.db, ['id', item.id]);
            this.db[ind] = item;
        };
        return DbWrapper;
    }());
    Base.DbWrapper = DbWrapper;
    var Adapter = (function () {
        function Adapter(db) {
            if (db === void 0) { db = new Base.DbWrapper([]); }
            this.db = db;
            this.response = new http_1.ResponseOptions();
        }
        Adapter.prototype.setRequest = function (request) {
            this.request = request;
        };
        Adapter.prototype.get = function () {
            this.response.body = this.db.find(this.request.get);
            console.log({ res: this.response.body, get: this.request.get, db: this.db });
            return this.response;
        };
        Adapter.prototype.post = function () {
            this.response.body = this.db.create(this.request.post);
            return this.response;
        };
        Adapter.prototype.del = function () {
            return this.response;
        };
        Adapter.prototype.put = function () {
            return this.response;
        };
        return Adapter;
    }());
    Base.Adapter = Adapter;
})(Base = exports.Base || (exports.Base = {}));
//# sourceMappingURL=base.js.map