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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("../user/user.model");
let AuthService = class AuthService {
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.validatorUser(dto);
        const tokens = await this.issueTokenPair(String(user._id));
        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }
    async getNewTokens({ refreshToken }) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Please sign in!');
        }
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result) {
            throw new common_1.UnauthorizedException('Invalid refresh or expired!');
        }
        const user = await this.UserModel.findById(result._id);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const tokens = await this.issueTokenPair(String(user._id));
        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }
    async register(dto) {
        const oldUser = await this.UserModel.findOne({ email: dto.email });
        if (oldUser) {
            throw new common_1.BadRequestException('User with this email is already registered');
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const newUser = new this.UserModel({
            email: dto.email,
            name: dto.name,
            surname: dto.surname,
            password: await (0, bcryptjs_1.hash)(dto.password, salt),
        });
        const user = await newUser.save();
        const tokens = await this.issueTokenPair(String(user._id));
        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }
    async validatorUser(dto) {
        const user = await this.UserModel.findOne({ email: dto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const IsValidPassword = await (0, bcryptjs_1.compare)(dto.password, user.password);
        if (!IsValidPassword) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return user;
    }
    async issueTokenPair(userId) {
        const data = { _id: userId };
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '500d',
        });
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '300d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    returnUserFields(user) {
        return {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,
            surname: user.surname,
            roles: user.roles,
            avatar: user.avatar
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map