const config = {
    Success: 0, // 成功
    NO_Exist: 1, // 不存在
    Exist_Data: 2, // 已存在该数据
    Parameter_Error: 3, // 参数错误
    No_Auth: 4, // 无权限
    Server_Error: 5 // 服务器错误
};
const resData = {
    code: 0,
    data: {},
    msg: '请求成功'
};

const _id2Id = function (data) {
    data.id = data._id;
    delete data._id;
    return data;
};

const _id2IdByList = function (list) {
    return list.map(item => _id2Id(item));
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
    resConfig: config,
    _id2Id,
    _id2IdByList
};
