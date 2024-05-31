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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async byId(_id) {
        const user = await this.UserModel.findById(_id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateProfile(_id, dto) {
        const user = await this.byId(_id);
        const isSameUser = await this.UserModel.findOne({ email: dto.email });
        if (isSameUser && String(_id) !== String(isSameUser._id)) {
            throw new common_1.NotFoundException('Email busy');
        }
        user.email = dto.email;
        if (dto.name)
            user.name = dto.name;
        if (dto.surname)
            user.surname = dto.surname;
        if (dto.avatar)
            user.avatar = dto.avatar;
        if (dto.country)
            user.country = dto.country;
        if (dto.city)
            user.city = dto.city;
        if (dto.instagram)
            user.instagram = dto.instagram;
        if (dto.telegram)
            user.telegram = dto.telegram;
        if (dto.youtube)
            user.youtube = dto.youtube;
        if (dto.information)
            user.information = dto.information;
        if (dto.isAdmin || dto.isAdmin === false)
            user.isAdmin = dto.isAdmin;
        await user.save();
        return;
    }
    async getCount() {
        return this.UserModel.find().count().exec();
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm) {
            options = {
                $or: [
                    {
                        email: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        }
        return this.UserModel.find(options)
            .select('-password -updatedAt -__v')
            .sort({
            createdAt: 'desc',
        })
            .exec();
    }
    async delete(id) {
        return this.UserModel.findByIdAndDelete(id).exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map