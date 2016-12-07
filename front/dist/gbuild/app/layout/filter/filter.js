"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var _1 = require("../../shared/");
var FilterWidget = (function () {
    function FilterWidget() {
        this.send = new core_1.EventEmitter();
        this.filter = new _1.Tools.Filter();
    }
    FilterWidget.prototype.goBack = function () {
        this.filter.back();
        this.onSubmit();
    };
    FilterWidget.prototype.goNext = function () {
        this.filter.next();
        this.onSubmit();
    };
    FilterWidget.prototype.onReset = function () {
        this.send.emit({ filter: this.filter });
    };
    FilterWidget.prototype.onSubmit = function () {
        this.send.emit({ filter: this.filter });
    };
    return FilterWidget;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FilterWidget.prototype, "send", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", _1.Tools.Filter)
], FilterWidget.prototype, "filter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], FilterWidget.prototype, "limits", void 0);
FilterWidget = __decorate([
    core_1.Component({
        selector: 'filter',
        templateUrl: 'app/layout/filter/filter.html',
    }),
    __metadata("design:paramtypes", [])
], FilterWidget);
exports.FilterWidget = FilterWidget;
;
//# sourceMappingURL=filter.js.map