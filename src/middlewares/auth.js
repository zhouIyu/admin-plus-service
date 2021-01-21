const JWT = require('../utils/jwt');
const { resConfig } = require('../utils/response');

module.exports = function auth () {
    return async (ctx, next) => {
        console.log(ctx.request.url);
        if (JWT.isWhite(ctx.request.url)) {
            await next();
        } else {
            const token = ctx.request.headers.authorization;
            if (!token) {
                return ctx.error(resConfig.No_Auth, '无权限访问');
            }
            const result = await JWT.verifyToken(token);

            if (!result) {
                return ctx.error(resConfig.No_Auth, '无权限访问');
            }
            ctx.user = result;
            await next();
        }
    };
};
