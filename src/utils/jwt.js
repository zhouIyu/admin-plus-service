const jwt = require('jsonwebtoken');
const config = require('config');

class JWT {
    static isWhite (url) { // 校验是否是白名单
        const whiteList = config.get('jwt.whiteList');
        return whiteList.includes(url);
    }

    static async verifyToken (token) {
        try {
            const secret = config.get('jwt.secret');
            const data = jwt.verify(token, secret);
            return data;
        } catch (e) {
            return false;
        }
    }

    static setToken (body) {
        console.log(config.get('jwt.expiresIn'));
        return jwt.sign(body, config.get('jwt.secret'), {
            expiresIn: config.get('jwt.expiresIn')
        });
    }
}

module.exports = JWT;
