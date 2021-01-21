const Log = require('../utils/log');
const { Response, resConfig } = require('../utils/response');

module.exports = function errorHandle () {
    return async (ctx, next) => {
        const start = new Date(); // 开始时间
        let ms = 0; // 间隔时间
        ctx.success = (data, msg) => {
            ctx.body = Response.success(data, msg);
        };
        ctx.error = (code, msg) => {
            ctx.body = Response.error(code, msg);
        };

        try {
            await next(); // 下一个中间件
            ms = new Date() - start;
            Log.response(ctx, `${ms}ms`); // 记录响应日志
        } catch (error) {
            ms = new Date() - start;
            Log.error(ctx, error, `${ms}ms`); // 记录异常日志
            ctx.error(resConfig.Server_Error, error.message);
        }
    };
};
