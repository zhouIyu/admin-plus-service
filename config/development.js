module.exports = {
    mode: 'development',
    port: 3001,
    db: {
        uri: 'mongodb://127.0.0.1:27017/test_koa'
    },
    jwt: {
        secret: 'XuRrpn1cEDQMKemOUSYLWsYRTEhW9qWH',
        expiresIn: '2h',
        whiteList: [
            '/user/register',
            '/user/login'
        ]
    }
};
