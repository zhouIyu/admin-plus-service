const { resConfig } = require('../utils/response');

module.exports = function (schema) {
    return async (ctx, next) => {
        try {
            let body = {};
            if (ctx.request.method === 'GET') {
                body = ctx.request.query;
            } else {
                body = ctx.request.body;
            }
            await schema.validateAsync(body);
            await next();
        } catch (error) {
            ctx.error(resConfig.Parameter_Error, error.message);
        }
    };
};
