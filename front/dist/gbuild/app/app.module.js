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
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var _1 = require("./config/");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_1 = require("./app");
var _2 = require("./pages/");
var Widgets = require("./widgets/");
var _3 = require("./shared/");
var ng2_datepicker_1 = require("ng2-datepicker");
var _ = require('lodash');
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    core_1.Pipe({ name: 'keys' }),
    __metadata("design:paramtypes", [])
], KeysPipe);
exports.KeysPipe = KeysPipe;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_2.NgModule({
        imports: [ng2_datepicker_1.DatePickerModule, platform_browser_1.BrowserModule, _1.routing, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule],
        declarations: _.union([
            app_1.App,
            ng2_file_upload_1.FileSelectDirective,
            ng2_file_upload_1.FileDropDirective,
            KeysPipe,
            _2.DashboardPage
        ], _.values(Widgets)),
        bootstrap: [app_1.App],
        providers: [_3.Providers.FACTORY]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map