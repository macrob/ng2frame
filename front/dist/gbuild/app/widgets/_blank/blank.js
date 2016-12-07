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
var BlankWidget = (function () {
    function BlankWidget(serviceFactory) {
        this.serviceFactory = serviceFactory;
        this.limit = 50;
        this.title = 'Blank';
        this.limits = [10, 50, 100];
    }
    BlankWidget.prototype.ngOnInit = function () {
        if (!this.records) {
            this.loadData();
        }
    };
    BlankWidget.prototype.loadData = function () {
    };
    BlankWidget.prototype.onReload = function () {
        this.loadData();
    };
    return BlankWidget;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], BlankWidget.prototype, "limit", void 0);
BlankWidget = __decorate([
    core_1.Component({
        selector: 'blank',
        templateUrl: 'app/widgets/_blank/blank.html',
    }),
    __metadata("design:paramtypes", [_1.Service.Factory])
], BlankWidget);
exports.BlankWidget = BlankWidget;
;
//# sourceMappingURL=blank.js.map