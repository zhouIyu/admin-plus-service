const RoleModel = require('../model/role');
const { resConfig } = require('../utils/response');

const validateExitRole = async (ctx, id) => {
    if (!id) {
        return ctx.error(resConfig.Parameter_Error, 'role_id is undefined');
    }
    const user = await RoleModel.findOneInfo({
        _id: id
    });
    if (!user) {
        return ctx.error(resConfig.NO_Exist, '该角色不存在');
    }
    return user;
};

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
        result.list = await RoleModel.getRoleList($cont, { create_time: -1 }, {
            limit,
            offset
        });
        result.total = await RoleModel.find($cont).count();
        ctx.success(result);
    }

    static async removeRole (ctx) {
        const { role_id: id } = ctx.request.params;
        await validateExitRole(ctx, id);
        await RoleModel.updateRole({ _id: id }, { valid: 0 });
        ctx.success({}, '删除成功');
    }

    static async updateRoleById (ctx) {
        const { role_id: id } = ctx.request.params;
        const body = ctx.request.body;
        await validateExitRole(ctx, id);
        await RoleModel.updateRole({ _id: id }, body);
        ctx.success({}, '更新成功');
    }
}

module.exports = RoleController;
