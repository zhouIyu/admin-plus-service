const config = {
    Success: 0, // 成功
    Exist_User: 2, // 用户已存在
    Parameter_Error: 3, // 参数错误
    No_Auth: 4, // 无权限
    Server_Error: 5 // 服务器错误
};
const resData = {
    code: 0,
    data: {},
    msg: '请求成功'
};

class Response {
    static success (data, msg) {
        resData.code = 0;
        resData.data = data || {};
        resData.msg = msg || '请求成功';
        return resData;
    };

    static error (code, msg) {
        resData.code = code;
        resData.data = {};
        resData.msg = msg || '请求失败';
        return resData;
    };
}

module.exports = {
    Response,
    resConfig: config
};
