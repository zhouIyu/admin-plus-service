const Joi = require('joi');

const create = {
    name: Joi.string().required().error(new Error('角色name不能为空'))
};

const list = {
    limit: Joi.number().required().error(new Error('limit 不能为空')),
    offset: Joi.number().required().error(new Error('offset 不能为空'))
};

module.exports = {
    create,
    list
};
