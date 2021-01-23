const mongoose = require('mongoose');
const { _id2IdByList } = require('../utils/response');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'name 不能为空']
    },
    description: {
        type: String,
        required: [true, 'description 不能为空']
    },
    valid: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    create_time: {
        type: Date,
        default: Date.now()
    },
    update_time: {
        type: Date,
        default: Date.now()
    }
});

schema.statics.getRoleList = function (condition, sort, body) {
    const model = this;
    const views = {
        valid: 0,
        __v: 0
    };
    return new Promise((resolve, reject) => {
        model.find(condition, views).sort(sort).limit(body.limit).skip(body.offset).lean().exec(function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(_id2IdByList(docs));
            }
        });
    });
};

schema.statics.updateRole = function (condition, body) {
    const model = this;
    body.update_time = Date.now();
    return new Promise((resolve, reject) => {
        model.update(condition, body).exec(function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

const model = mongoose.model('role', schema);
module.exports = model;
