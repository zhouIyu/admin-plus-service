const mongoose = require('mongoose');
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
	email: {
		type: String,
		required: [true, 'email 不能为空']
	},
	project: [{
		type: Schema.Types.ObjectId,
		ref: 'project'
	}],
	valid: {
		type: Number,
		enum: [0, 1],
		default: 1
	},
	createTime: {
		type: Date,
		default: Date.now()
	}
});

const model = mongoose.model('user', schema);

module.exports = model;
