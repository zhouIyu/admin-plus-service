const log4js = require('log4js');

const config = {
    appenders: {
        error: {
            category: 'errorLogger', // logger名称
            type: 'dateFile', // 日志类型
            filename: 'logs/error/error', // 日志输出位置
            alwaysIncludePattern: true, // 是否总是有后缀名
            pattern: '-yyyy-MM-dd-hh.log' // 后缀，每小时创建一个新的日志文件
        },
        response: {
            category: 'resLogger', // logger名称
            type: 'dateFile', // 日志类型
            filename: 'logs/response/response', // 日志输出位置
            alwaysIncludePattern: true, // 是否总是有后缀名
            pattern: '-yyyy-MM-dd-hh.log' // 后缀，每小时创建一个新的日志文件
        }
    },
    categories: {
        error: {
            appenders: ['error'],
            level: 'error'
        },
        response: {
            appenders: ['response'],
            level: 'info'
        },
        default: {
            appenders: ['response'],
            level: 'info'
        }
    }
};
log4js.configure(config);

class Log {
    static formatLog (req, time) {
        const method = req.method;
        const log = [`\n ${method} ${req.originalUrl}`, `request client ip: ${req.ip}`];
        console.log(req.originalUrl);
        if (method === 'GET') { // 请求参数
            log.push(`request query: ${JSON.stringify(req.query)}\n`);
        } else {
            log.push(`request body: ${JSON.stringify(req.body)}\n`);
        }
        log.push(`response time: ${time}`); // 服务器响应时间
        return log;
    }

    static error (ctx, err, time) {
        const logger = log4js.getLogger('error');
        const errorLog = Log.formatLog(ctx.request, time);
        errorLog.push(`err name: ${err.name}`); // 错误名称
        errorLog.push(`err message: ${err.message}`); // 错误信息
        errorLog.push(`err stack: ${err.stack}`); // 错误详情
        errorLog.push('------------------------ end\n'); // 错误信息结束
        logger.error(errorLog);
    }

    static response (ctx, time) {
        const logger = log4js.getLogger('response');
        const resLog = Log.formatLog(ctx.request, time); // 添加请求日志
        resLog.push(`response status: ${ctx.status}`); // 响应状态码
        resLog.push(`response body: \n${JSON.stringify(ctx.response.body)}`); // 响应内容
        resLog.push('------------------------ end\n'); // 响应日志结束
        logger.info(resLog);
    }
}

module.exports = Log;
