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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntensiveService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const intensive_model_1 = require("./intensive.model");
let IntensiveService = class IntensiveService {
    constructor(IntensiveModel) {
        this.IntensiveModel = IntensiveModel;
    }
    async bySlug(slug) {
        const doc = await this.IntensiveModel.findOne({ slug }).exec();
        if (!doc) {
            throw new common_1.NotFoundException('Intensive not found');
        }
        return doc;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm)
            options = {
                $or: [
                    {
                        name: new RegExp(searchTerm, 'i'),
                    },
                    {
                        slug: new RegExp(searchTerm, 'i'),
                    },
                    {
                        description: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        return this.IntensiveModel.find(options)
            .select('-updatedAt -__v')
            .sort({
            createdAt: 'desc',
        })
            .exec();
    }
    async getCollections() {
        const genres = await this.getAll();
        const collections = genres;
        return collections;
    }
    async byId(_id) {
        const intensive = await this.IntensiveModel.findById(_id);
        if (!intensive) {
            throw new common_1.NotFoundException('Intensive not found');
        }
        return intensive;
    }
    async create() {
        const defaultValue = {
            name: '',
            slug: '',
            description: '',
            poster: '',
        };
        const intensive = await this.IntensiveModel.create(defaultValue);
        return intensive._id;
    }
    async update(_id, dto) {
        const updateDoc = await this.IntensiveModel.findByIdAndUpdate(_id, dto, {
            new: true,
        }).exec();
        if (!updateDoc) {
            throw new common_1.NotFoundException('Intensive not found');
        }
        return updateDoc;
    }
    async delete(id) {
        const deleteDoc = await this.IntensiveModel.findByIdAndDelete(id).exec();
        if (!deleteDoc) {
            throw new common_1.NotFoundException('Intensive not found');
        }
        return deleteDoc;
    }
};
exports.IntensiveService = IntensiveService;
exports.IntensiveService = IntensiveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(intensive_model_1.IntensiveModel)),
    __metadata("design:paramtypes", [Object])
], IntensiveService);
//# sourceMappingURL=intensive.service.js.map