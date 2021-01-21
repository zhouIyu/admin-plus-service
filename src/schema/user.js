const Joi = require('joi');

const user = {
    username: Joi.string().required().error(new Error('username不能为空')),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('password 不能为空'))
};

const register = Joi.object({
    email: Joi.string().email().required().error(new Error('email 不能为空')),
    ...user
});

const login = Joi.object({
    ...user
});

module.exports = {
    register,
    login
};
