const { resConfig } = require('../utils/response');
const Joi = require('joi');

module.exports = function (json) {
    return async (ctx, next) => {
        try {
            let body = {};
            if (ctx.request.method === 'GET') {
                body = ctx.request.query;
            } else {
                body = ctx.request.body;
            }
            const schema = Joi.object(json);
            await schema.validateAsync(body);
            await next();
        } catch (error) {
            ctx.error(resConfig.Parameter_Error, error.message);
        }
    };
};
