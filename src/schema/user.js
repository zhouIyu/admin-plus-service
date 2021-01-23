const Joi = require('joi');

const user = {
    username: Joi.string().required().error(new Error('username不能为空')),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('password 不能为空'))
};

const register = {
    ...user
};

const login = {
    ...user
};

module.exports = {
    register,
    login
};
