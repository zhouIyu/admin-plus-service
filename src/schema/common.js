const Joi = require('joi');

const list = {
    limit: Joi.number().required().error(new Error('limit 不能为空')),
    offset: Joi.number().required().error(new Error('offset 不能为空'))
};

module.exports = {
    list
};
