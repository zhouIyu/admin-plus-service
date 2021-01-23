const UserModel = require('../model/user');
const { resConfig } = require('../utils/response');
const JWT = require('../utils/jwt');

const validateExitUser = async (ctx, id) => {
    if (!id) {
        return ctx.error(resConfig.Parameter_Error, 'user_id is undefined');
    }
    const user = await UserModel.findOneInfo({
        _id: id
    });
    if (!user) {
        return ctx.error(resConfig.NO_Exist, '该用户不存在');
    }
    return user;
};

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

    static async getUserInfoById (ctx) {
        const { user_id: id } = ctx.request.params;
        const user = await validateExitUser(ctx, id);
        ctx.success(user);
    }

    static async getUserList (ctx) {
        const query = ctx.request.query;
        const limit = Number(query.limit) || 10;
        const offset = Number(query.offset) || 0;
        const result = {
            total: 0,
            list: []
        };
        const $cont = {};

        if (query.valid) {
            $cont.valid = query.valid;
        }

        result.list = await UserModel.getUserList($cont, { create_time: -1 }, {
            limit,
            offset
        });
        result.total = await UserModel.find($cont).count();
        ctx.success(result);
    }

    static async updateUserById (ctx) {
        const {
            params,
            body
        } = ctx.request;
        const $cont = {
            _id: params.user_id
        };
        await validateExitUser(ctx, params.user_id);
        await UserModel.updateUser($cont, body);
        ctx.success({}, '更新成功');
    }
}

module.exports = UserController;
