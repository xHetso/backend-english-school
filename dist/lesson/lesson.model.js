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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const author_model_1 = require("../author/author.model");
const intensive_model_1 = require("../intensive/intensive.model");
class LessonModel extends defaultClasses_1.TimeStamps {
}
exports.LessonModel = LessonModel;
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], LessonModel.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], LessonModel.prototype, "slug", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], LessonModel.prototype, "videoUrl", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 4.0 }),
    __metadata("design:type", Number)
], LessonModel.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => intensive_model_1.IntensiveModel }),
    __metadata("design:type", Array)
], LessonModel.prototype, "intensives", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => author_model_1.AuthorModel }),
    __metadata("design:type", Array)
], LessonModel.prototype, "authors", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], LessonModel.prototype, "exercises", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], LessonModel.prototype, "isSendTelegram", void 0);
//# sourceMappingURL=lesson.model.js.map