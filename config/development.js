module.exports = {
    mode: 'development',
    port: 3001,
    db: {
        uri: 'mongodb://test:test@127.0.0.1:27017/app_admin'
    },
    jwt: {
        secret: 'KC31zpryumnfL4hSNtxIAPPz0IpBSPIY',
        expiresIn: '2h',
        whiteList: [
            '/user/create',
            '/user/login'
        ]
    }
};
