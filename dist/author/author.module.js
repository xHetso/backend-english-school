"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const author_controller_1 = require("./author.controller");
const author_model_1 = require("./author.model");
const author_service_1 = require("./author.service");
let AuthorModule = class AuthorModule {
};
exports.AuthorModule = AuthorModule;
exports.AuthorModule = AuthorModule = __decorate([
    (0, common_1.Module)({
        controllers: [author_controller_1.AuthorController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: author_model_1.AuthorModel,
                    schemaOptions: {
                        collection: 'Author',
                    },
                },
            ]),
        ],
        providers: [author_service_1.AuthorService],
    })
], AuthorModule);
//# sourceMappingURL=author.module.js.map