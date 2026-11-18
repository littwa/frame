"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const cloudinary = __importStar(require("cloudinary"));
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const role_enum_1 = require("../../shared/enums/role.enum");
const jwt_1 = require("@nestjs/jwt");
const session_schema_1 = require("./session.schema");
const config_1 = require("@nestjs/config");
const common_service_1 = require("../../shared/services/common.service");
const users_constants_1 = require("../../shared/constants/users.constants");
const common_enum_1 = require("../../shared/enums/common.enum");
const media_enum_1 = require("../../shared/enums/media.enum");
const mail_service_1 = require("../../mail/mail.service");
let UsersService = class UsersService {
    constructor(sessionModel, userModel, jwtService, configService, configFactory, useClassTest, commonService, mailService) {
        this.sessionModel = sessionModel;
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.configFactory = configFactory;
        this.useClassTest = useClassTest;
        this.commonService = commonService;
        this.mailService = mailService;
        this.refreshTokenPath = 'jwtExpires._30days';
        this.accessTokenPath = 'jwtExpires._8hour';
        this.getPairTokensUtility = (session, user) => {
            const accessToken = this.jwtService.sign({
                sid: session._id,
                uid: session.uid,
                secret: process.env.TOKEN_SECRET,
                email: user.email,
                role: user.role,
                token_type: common_enum_1.ETokenTypes.Access,
            }, { expiresIn: this.configService.get(this.accessTokenPath).exp });
            const refreshToken = this.jwtService.sign({
                sid: session._id,
                uid: session.uid,
                secret: process.env.TOKEN_SECRET,
                email: user.email,
                role: user.role,
                token_type: common_enum_1.ETokenTypes.Refresh,
            }, { expiresIn: this.configService.get(this.refreshTokenPath).exp });
            return { accessToken, refreshToken };
        };
    }
    async createUserCustomer(createUserCustomerDto, file) {
        let user = await this.userModel.findOne({
            email: createUserCustomerDto.email,
            role: role_enum_1.ERole.Customer,
        });
        if (user)
            throw new common_1.BadRequestException('User customer with current email is registered');
        const hashPassword = await bcrypt.hash(createUserCustomerDto.password, 5);
        const image = await this.commonService.cloudinaryHost(file);
        user = await this.userModel.create({
            ...createUserCustomerDto,
            password: hashPassword,
            username: createUserCustomerDto.email.split('@')[0],
            status: role_enum_1.EStatus.Verified,
            dateCreated: Date.now(),
            ...(image?.secure_url && { avatarURL: image?.secure_url }),
            ...(image?.public_id && { public_id: image?.public_id }),
        });
        const { password, verificationCode, __v, ...userDtoReverse } = user.toObject();
        return userDtoReverse;
    }
    async sendEmail(email, text = 'Hi') {
        const tst = await this.mailService.tstMail();
        const tester = await this.mailService.sendWelcomeEmail(email, text);
        console.log('email sending');
        return {
            email,
            tst,
        };
    }
    async changePassword(email) { }
    async updateUser(param, body, file) {
        if (file && file.mimetype.split('/')[0] !== media_enum_1.EMediaType.Image) {
            throw new common_1.BadRequestException('Wrong uploaded type file');
        }
        const user = await this.userModel.findById(param.id).exec();
        const image = await this.commonService.cloudinaryHost(file);
        if (image && user.public_id) {
            await this.commonService.deleteFromCloudinary(user.public_id, media_enum_1.EMediaType.Image);
        }
        for (const key in body) {
            user[key] = body[key];
        }
        image?.secure_url && (user.avatarURL = image?.secure_url);
        image?.public_id && (user.public_id = image?.public_id);
        user.save();
        return user;
    }
    async signOutUser(parsedToken) {
        const deletedSession = await this.sessionModel.findByIdAndDelete(parsedToken.sid);
        if (!deletedSession) {
            throw new common_1.BadRequestException('No current session');
        }
        return { req: 'logOutUser Success' };
    }
    async getInfoUserCustomer({ uid: _id }) {
        const infoCustomer = await this.userModel.findOne({ _id });
        if (!infoCustomer)
            throw new common_1.BadRequestException('Customer was not found.');
        const { password, verificationCode, __v, ...userDtoInfo } = infoCustomer.toObject();
        return userDtoInfo;
    }
    async getUserById(id) {
        return this.userModel.findById(id, {
            status: 0,
            password: 0,
            cart: 0,
            orders: 0,
            watchedProducts: 0,
        });
    }
    async getUserFollowersById(id) {
        return (await this.userModel.findById(id, { followers: 1 }).populate('followers')).followers;
    }
    async getUserFollowingById(id) {
        return (await this.userModel.findById(id, { following: 1 }).populate('following')).following;
    }
    async getCurrentUser({ uid: _id }) {
        const infoUser = await this.userModel
            .findOne({
            _id,
        }, { password: 0 })
            .populate('followers')
            .populate('following');
        if (!infoUser)
            throw new common_1.BadRequestException('User was not found');
        const { password, verificationCode, __v, ...userDtoInfo } = infoUser.toObject();
        return userDtoInfo;
    }
    async getUsers(param, query, req) {
        const ARR_FIELDS = ['firstName', 'lastName', 'username'];
        const { page = null, size = users_constants_1.PAGINATION_USERS_DEFAULT.size, sort = users_constants_1.PAGINATION_USERS_DEFAULT.sort } = query;
        console.log(100005, param, param.someName, query);
        const users = await this.userModel.aggregate([
            ...(param.someName
                ? [
                    {
                        $match: {
                            $or: ARR_FIELDS.map(field => ({
                                [field]: { $regex: param.someName, $options: 'i' },
                            })),
                        },
                    },
                ]
                : []),
            {
                $sort: {
                    _id: sort === common_enum_1.ESortOrderBy.DESC ? -1 : 1,
                },
            },
        ]);
        console.log(users);
        return {
            body: users.slice(0, size),
            pagination: {
                page: null,
                size,
                sort,
                totalElements: users.length,
                totalPages: null,
                lastPage: size >= users.length,
            },
        };
    }
    async getUsersExtends(query) {
        const { size = users_constants_1.PAGINATION_USERS_DEFAULT.size, sort = users_constants_1.PAGINATION_USERS_DEFAULT.sort, ...findQueries } = query;
        const users = await this.userModel.aggregate([
            ...(Object.keys(findQueries).length
                ? [
                    {
                        $match: {
                            $and: Object.entries(findQueries).map(([k, v]) => ({
                                [k]: { $regex: new RegExp(['^', v, '$'].join(''), 'i') },
                            })),
                        },
                    },
                ]
                : []),
            {
                $sort: {
                    _id: sort === common_enum_1.ESortOrderBy.DESC ? -1 : 1,
                },
            },
        ]);
        console.log(users);
        return {
            body: users.slice(0, size),
            pagination: {
                page: null,
                size,
                sort,
                totalElements: users.length,
                totalPages: null,
                lastPage: size >= users.length,
            },
        };
    }
    async getCurrentUserAggregate({ uid: _id }) {
        const agg = await this.userModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(_id) } },
            {
                $unwind: {
                    path: '$cart',
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'cart.productId',
                    foreignField: '_id',
                    as: 'cart.product',
                },
            },
            {
                $unwind: {
                    path: '$cart.product',
                },
            },
            {
                $group: {
                    _id: '$_id',
                    products: {
                        $push: '$cart',
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'usersDetails',
                },
            },
            {
                $unwind: {
                    path: '$usersDetails',
                },
            },
            {
                $addFields: {
                    'usersDetails.cart': '$products',
                },
            },
            {
                $replaceRoot: {
                    newRoot: '$usersDetails',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'followers',
                    foreignField: '_id',
                    as: 'followers',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'following',
                    foreignField: '_id',
                    as: 'following',
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'favorites',
                    foreignField: '_id',
                    as: 'favorites',
                },
            },
        ]);
        console.log(10001, agg);
        if (!agg)
            throw new common_1.BadRequestException('User was not found');
        return agg;
    }
    async addFavoriteProduct(productId, req) {
        const user = await this.userModel.findByIdAndUpdate(req.user.uid, { $push: { favorites: productId } }, { new: true });
        return user;
    }
    async delFavoriteProduct(productId, req) {
        const user = await this.userModel.findByIdAndUpdate(req.user.uid, { $pull: { favorites: productId } }, { new: true });
        return user;
    }
    async addCartProduct(param, req) {
        const user = await this.userModel.findByIdAndUpdate(req.user.uid, {
            $push: {
                cart: {
                    productId: new mongoose.Types.ObjectId(param.productId),
                    amount: param.amount,
                },
            },
        }, { new: true });
        return user;
    }
    async delCartProduct(param, req) {
        const user = await this.userModel.findByIdAndUpdate(req.user.uid, {
            $pull: {
                cart: {
                    productId: new mongoose.Types.ObjectId(param.productId),
                    amount: param.amount,
                },
            },
        }, { new: true });
        return user;
    }
    async follow(req, body) {
        const user = await this.userModel.findById(req.user.uid).exec();
        if (!user.following.includes(body.followId)) {
            user.following.push(body.followId);
            await user.save();
            const follower = await this.userModel.findById(body.followId).exec();
            if (!follower.followers.includes(req.user.uid)) {
                follower.followers.push(req.user.uid);
                await follower.save();
            }
        }
        return (await user.populate('followers')).populate('following');
    }
    async unfollow(req, body) {
        const user = await this.userModel.findByIdAndUpdate(req.user.uid, { $pull: { following: body.followId } }, { new: true });
        const follower = await this.userModel.findByIdAndUpdate(body.followId, { $pull: { followers: req.user.uid } }, { new: true });
        return (await user.populate('followers')).populate('following');
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userModel
            .findOne({ email })
            .populate('followers')
            .populate('following');
        if (!user)
            throw new common_1.BadRequestException('User was not found');
        if (user.status !== 'Verified')
            throw new common_1.BadRequestException('User not verified');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Password wrong');
        const userObjectId = user._id;
        const createSession = await this.createSessionUtility(userObjectId);
        const tokens = this.getPairTokensUtility(createSession, user);
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            status: user.status,
            role: user.role,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async getRefreshToken(req) {
        const { uid, sid } = req.user;
        const session = await this.sessionModel.findById(sid);
        const user = await this.userModel.findById(uid);
        console.log('55555', req.user, session, user);
        if (!session || !user || user._id.toString() !== session.uid.toString())
            throw new common_1.UnauthorizedException('Not authorized');
        const delSession = await this.sessionModel.findByIdAndDelete(sid);
        const createSession = await this.createSessionUtility(uid);
        const newPairTokens = this.getPairTokensUtility(createSession, user);
        return newPairTokens;
    }
    async createSessionUtility(uid) {
        const expRefreshToken = Date.now() + this.configService.get(this.refreshTokenPath).expIncrement;
        return await this.sessionModel.create({
            uid,
            expRefreshToken,
        });
    }
    decodeAnyToken(authorization) {
        if (!authorization) {
            throw new common_1.BadRequestException('No authorization token to parse');
        }
        const token = authorization.slice(7);
        return this.jwtService.decode(token, { complete: true });
    }
    async test(body, param, query, file) {
        cloudinary.v2.config({
            cloud_name: 'dweey9w3n',
            api_key: '581476537898735',
            api_secret: '5E00uGGPdOMvucu8o3rtRB8oBMY',
            secure: true,
        });
        const form = new FormData();
        form.append('file', file);
        console.log('file::: ', file);
        let response;
        try {
        }
        catch (err) {
            console.log(1111111, err);
        }
        console.log('response::: ', response);
        return {
            response,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(session_schema_1.Session.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(4, (0, common_1.Inject)('UseFactoryTest')),
    __param(5, (0, common_1.Inject)('UseClassTest')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        jwt_1.JwtService,
        config_1.ConfigService, Object, Object, common_service_1.CommonService,
        mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map