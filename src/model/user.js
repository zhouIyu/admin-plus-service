const mongoose = require('mongoose');
const { _id2Id } = require('../utils/response');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: [true, 'username 不能为空']
    },
    password: {
        type: String,
        required: [true, 'password 不能为空']
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

schema.statics.findOneInfo = function (condition) {
    const model = this;
    const views = {
        __v: 0,
        password: 0,
        valid: 0
    };
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

const model = mongoose.model('user', schema);

module.exports = model;
