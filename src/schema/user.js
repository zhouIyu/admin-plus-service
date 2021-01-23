const Joi = require('joi');
const { list } = require('./common');

const user = {
    username: Joi.string().required().error(new Error('username不能为空')),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('password 不能为空'))
};

const register = {
    role_id: Joi.string().required().error(new Error('role_id不能为空')),
    ...user
};

const login = {
    ...user
};

const userList = {
    ...list
};

module.exports = {
    register,
    login,
    list: userList
};
