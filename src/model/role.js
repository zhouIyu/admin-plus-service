const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
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

const model = mongoose.model('role', schema);
module.exports = model;
