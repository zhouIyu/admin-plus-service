const RoleModel = require('../model/role');
const { resConfig } = require('../utils/response');

class RoleController {
    static async createRole (ctx) {
        const body = ctx.request.body;
        const hasRole = await RoleModel.findOne({ name: body.name });
        if (hasRole) {
            return ctx.error(resConfig.Exist_Data, '该角色已存在');
        }

        const newRole = new RoleModel(body);
        await newRole.save();
        ctx.success({}, '添加成功');
    }

    static async getRoleList (ctx) {
        const query = ctx.request.query;
        const limit = query.limit || 10;
        const offset = query.offset || 0;
        const result = {
            total: 0,
            list: []
        };
        result.list = await RoleModel.find().limit(limit).skip(offset).sort({ create_time: -1 }).toArray();
        result.total = await RoleModel.find().count();
        ctx.success(result);
    }

    static async removeRole (ctx) {
        const { id } = ctx.request.params;
        console.log(id);
    }
}

module.exports = RoleController;
