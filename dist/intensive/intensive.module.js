"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntensiveModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const intensive_controller_1 = require("./intensive.controller");
const intensive_model_1 = require("./intensive.model");
const intensive_service_1 = require("./intensive.service");
let IntensiveModule = class IntensiveModule {
};
exports.IntensiveModule = IntensiveModule;
exports.IntensiveModule = IntensiveModule = __decorate([
    (0, common_1.Module)({
        controllers: [intensive_controller_1.IntensiveController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: intensive_model_1.IntensiveModel,
                    schemaOptions: {
                        collection: 'Intensive',
                    },
                },
            ]),
        ],
        providers: [intensive_service_1.IntensiveService],
    })
], IntensiveModule);
//# sourceMappingURL=intensive.module.js.map