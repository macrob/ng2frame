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
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
var UploadWidget = (function () {
    function UploadWidget() {
        this.complete = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
    }
    UploadWidget.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.url) {
            var url = this.url;
            this.uploader = new ng2_file_upload_1.FileUploader({
                url: url,
            });
            this.uploader.onCompleteAll = function () {
                _this.complete.emit();
            };
        }
    };
    UploadWidget.prototype.onClose = function () {
        this.close.emit();
    };
    return UploadWidget;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UploadWidget.prototype, "complete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UploadWidget.prototype, "close", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UploadWidget.prototype, "url", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UploadWidget.prototype, "params", void 0);
UploadWidget = __decorate([
    core_1.Component({
        selector: 'upload',
        templateUrl: 'app/widgets/fileupload/upload.html',
    }),
    __metadata("design:paramtypes", [])
], UploadWidget);
exports.UploadWidget = UploadWidget;
;
//# sourceMappingURL=upload.js.map