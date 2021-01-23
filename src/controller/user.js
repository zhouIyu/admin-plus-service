const UserModel = require('../model/user');
const { resConfig } = require('../utils/response');
const JWT = require('../utils/jwt');

class UserController {
    static async register (ctx) {
        const body = ctx.request.body;
        const user = await UserModel.findOne(body);
        if (user) {
            return ctx.error(resConfig.Exist_Data, '用户已存在');
        }
        const newUser = new UserModel(body);
        await newUser.save();
        ctx.success({}, '注册成功');
    }

    static async login (ctx) {
        const body = ctx.request.body;
        const user = await UserModel.findOneInfo(body);

        if (!user) {
            return ctx.error(resConfig.Parameter_Error, '用户名或者密码错误');
        }
        const token = JWT.setToken(user);
        ctx.success({ token }, '登录成功');
    }

    static async mine (ctx) {
        const user = ctx.user;
        ctx.success(user);
    }
}

module.exports = UserController;
