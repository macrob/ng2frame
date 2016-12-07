"use strict";
var moment = require("moment");
var Filter = (function () {
    function Filter(item) {
        this.start = moment().hours(0).minutes(0).seconds(0).day('Sunday').subtract(7, 'days');
        this.end = moment().hours(23).minutes(59).seconds(59).day('saturday');
        this.limit = 50;
        if (item) {
            if (item.start) {
                item.start = moment(item.start);
            }
            if (item.end) {
                item.end = moment(item.end);
            }
            Object.assign(this, item);
        }
        this.dif = this.getDif();
    }
    Filter.prototype.setStart = function (dt) {
        this.start = moment(dt).hours(0).minutes(0).seconds(0);
        this.dif = this.getDif();
    };
    Filter.prototype.setEnd = function (dt) {
        this.end = moment(dt).hours(23).minutes(59).seconds(59);
        this.dif = this.getDif();
    };
    Filter.prototype.getDif = function () {
        var dif = 0;
        switch (true) {
            case this.end.diff(this.start, 'days') <= 1:
                dif = 1;
                break;
            case this.end.diff(this.start, 'days') <= 7:
                dif = 7;
                break;
            case this.end.diff(this.start, 'days') <= 14:
                dif = 14;
                break;
            default:
                dif = 1;
        }
        return dif;
    };
    Filter.prototype.back = function () {
        this.start = moment(this.start.subtract(this.dif, 'days').toDate());
        this.end = moment(this.end.subtract(this.dif, 'days').toDate());
    };
    Filter.prototype.next = function () {
        this.start = moment(this.start.add(this.dif, 'days').toDate());
        this.end = moment(this.end.add(this.dif, 'days').toDate());
    };
    Filter.prototype.weekBack = function () {
        this.start = moment(this.start.subtract(7, 'days').toDate());
        this.end = moment(this.end.subtract(7, 'days').toDate());
    };
    Filter.prototype.weekNext = function () {
        this.start = moment(this.start.add(7, 'days').toDate());
        this.end = moment(this.end.add(7, 'days').toDate());
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map