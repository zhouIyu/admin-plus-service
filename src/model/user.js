const mongoose = require('mongoose');
const {
    getList,
    updateOne,
    findOne
} = require('../utils/db');
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
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'role 不能为空']
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
        password: 0
    };
    return findOne(model, condition, views);
};

schema.statics.getUserList = function (condition, sort, body) {
    const model = this;
    const views = {
        password: 0
    };
    return getList(model, condition, body, sort, views);
};

schema.statics.updateUser = function (condition, body) {
    const model = this;
    return updateOne(model, condition, body);
};

const model = mongoose.model('user', schema);

module.exports = model;
