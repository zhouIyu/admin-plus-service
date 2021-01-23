const mongoose = require('mongoose');
const {
    getList,
    updateOne,
    findOne
} = require('../utils/db');

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

schema.statics.findOneInfo = function (condition) {
    const model = this;
    return findOne(model, condition);
};

schema.statics.getRoleList = function (condition, sort, body) {
    const model = this;
    return getList(model, condition, body, sort);
};

schema.statics.updateRole = function (condition, body) {
    const model = this;
    return updateOne(model, condition, body);
};

const model = mongoose.model('role', schema);
module.exports = model;
