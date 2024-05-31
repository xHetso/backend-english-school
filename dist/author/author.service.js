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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const author_model_1 = require("./author.model");
let AuthorService = class AuthorService {
    constructor(AuthorModel) {
        this.AuthorModel = AuthorModel;
    }
    async bySlug(slug) {
        const doc = await this.AuthorModel.findOne({ slug }).exec();
        if (!doc) {
            throw new common_1.NotFoundException('Author not found');
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
                ],
            };
        return this.AuthorModel.aggregate()
            .match(options)
            .lookup({
            from: 'Lesson',
            foreignField: 'authors',
            localField: '_id',
            as: 'lessons',
        })
            .addFields({
            countLessons: { $size: '$lessons' },
        })
            .project({
            __v: 0,
            updatedAt: 0,
            lessons: 0,
        })
            .sort({
            createdAt: -1,
        })
            .exec();
    }
    async byId(_id) {
        const author = await this.AuthorModel.findById(_id);
        if (!author) {
            throw new common_1.NotFoundException('Author not found');
        }
        return author;
    }
    async create() {
        const defaultValue = {
            name: '',
            slug: '',
            photo: '',
        };
        const author = await this.AuthorModel.create(defaultValue);
        return author._id;
    }
    async update(_id, dto) {
        const updateDoc = await this.AuthorModel.findByIdAndUpdate(_id, dto, {
            new: true,
        }).exec();
        if (!updateDoc) {
            throw new common_1.NotFoundException('Author not found');
        }
        return updateDoc;
    }
    async delete(id) {
        const deleteDoc = await this.AuthorModel.findByIdAndDelete(id).exec();
        if (!deleteDoc) {
            throw new common_1.NotFoundException('Author not found');
        }
        return deleteDoc;
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(author_model_1.AuthorModel)),
    __metadata("design:paramtypes", [Object])
], AuthorService);
//# sourceMappingURL=author.service.js.map