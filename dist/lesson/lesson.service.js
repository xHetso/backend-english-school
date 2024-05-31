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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const lesson_model_1 = require("./lesson.model");
let LessonService = class LessonService {
    constructor(LessonModel) {
        this.LessonModel = LessonModel;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm)
            options = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        return this.LessonModel.find(options)
            .select('-updatedAt -__v')
            .sort({
            createdAt: 'desc',
        })
            .populate('authors intensives')
            .exec();
    }
    async bySlug(slug) {
        const doc = await this.LessonModel.findOne({ slug })
            .populate('authors intensives')
            .exec();
        if (!doc) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return doc;
    }
    async byAuthor(authorId) {
        const docs = await this.LessonModel.find({ authors: authorId }).exec();
        if (!docs) {
            throw new common_1.NotFoundException('Lessons not found');
        }
        return docs;
    }
    async byIntensives(genreIds) {
        const docs = await this.LessonModel.find({
            intensives: { $in: genreIds },
        }).exec();
        if (!docs) {
            throw new common_1.NotFoundException('Lessons not found');
        }
        return docs;
    }
    async updateCountOpened(slug) {
        const updateDoc = await this.LessonModel.findOneAndUpdate({ slug }, {
            $inc: {
                countOpened: 1,
            },
        }, {
            new: true,
        }).exec();
        if (!updateDoc)
            throw new common_1.NotFoundException('Lesson not found');
        return updateDoc;
    }
    async getMostPopular() {
        return await this.LessonModel.find({ countOpened: { $gt: 0 } })
            .sort({ countOpened: -1 })
            .populate('intensives')
            .exec();
    }
    async byId(_id) {
        const doc = await this.LessonModel.findById(_id);
        if (!doc) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return doc;
    }
    async create() {
        const defaultValue = {
            title: '',
            slug: '',
            videoUrl: '',
            intensives: [],
            authors: [],
            exercises: [],
            isSendTelegram: false,
        };
        const lesson = await this.LessonModel.create(defaultValue);
        return lesson._id;
    }
    async update(_id, dto) {
        const updateDoc = await this.LessonModel.findByIdAndUpdate(_id, dto, {
            new: true,
        }).exec();
        if (!updateDoc) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return updateDoc;
    }
    async delete(id) {
        const deleteDoc = await this.LessonModel.findByIdAndDelete(id).exec();
        if (!deleteDoc)
            throw new common_1.NotFoundException('Lesson not found');
        return deleteDoc;
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(lesson_model_1.LessonModel)),
    __metadata("design:paramtypes", [Object])
], LessonService);
//# sourceMappingURL=lesson.service.js.map