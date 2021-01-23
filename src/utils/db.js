const mongoose = require('mongoose');
const { _id2Id } = require('./response');
const { _id2IdByList } = require('./response');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
};

const init = function (uri) {
    mongoose.connect(uri, options);
    const db = mongoose.connection;
    db.on('error', () => {
        console.log('error: 数据库连接错误');
        throw new Error('数据库连接错误');
    });
    db.on('open', () => {
        console.log('success: 数据库连接成功');
    });
};

const getList = function (model, condition = {}, body = {}, sort = {}, views = {}) {
    return new Promise((resolve, reject) => {
        const defaultViews = {
            __v: 0
        };
        views = Object.assign(views, defaultViews);
        model.find(condition, views).sort(sort).limit(body.limit).skip(body.offset).lean().exec(function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(_id2IdByList(docs));
            }
        });
    });
};

const updateOne = function (model, condition = {}, body = {}) {
    return new Promise((resolve, reject) => {
        body.update_time = Date.now();
        model.update(condition, body).exec(function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

const findOne = function (model, condition = {}, views = {}) {
    const defaultViews = {
        __v: 0
    };
    views = Object.assign(views, defaultViews);
    return new Promise((resolve, reject) => {
        model.findOne(condition, views).lean().exec(function (err, doc) {
            if (err) {
                reject(err);
            } else {
                if (!doc) {
                    return resolve(false);
                }
                resolve(_id2Id(doc));
            }
        });
    });
};

module.exports = {
    init,
    getList,
    updateOne,
    findOne
};
