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
var DashboardPage = (function () {
    function DashboardPage(serviceFactory) {
        this.serviceFactory = serviceFactory;
        this.title = 'Dashboard';
    }
    return DashboardPage;
}());
DashboardPage = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: 'app/pages/dashboard/dashboard.html',
        styles: ["\n\t\ttable {\n\t\t\t\ttable-layout: fixed;\n\t\t\t\tword-wrap: break-word;\n\t\t};\n\n\t.widget-overflow {\n\t\toverflow:scroll;\n\t\tbox-sizing:inherit;\n\t\twidth:250px;\n\t}\n\t"]
    }),
    __metadata("design:paramtypes", [_1.Service.Factory])
], DashboardPage);
exports.DashboardPage = DashboardPage;
;
//# sourceMappingURL=dashboard.js.map