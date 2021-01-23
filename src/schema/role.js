const Joi = require('joi');
const { list } = require('./common');

const create = {
    name: Joi.string().required().error(new Error('角色name不能为空')),
    description: Joi.string().required().error(new Error('角色描述不能为空'))
};

const roleList = {
    ...list
};

module.exports = {
    create,
    list: roleList
};
