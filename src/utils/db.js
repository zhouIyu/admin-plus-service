const mongoose = require('mongoose');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
};

module.exports = function (uri) {
    mongoose.connect(uri, options);
    const db = mongoose.connection;
    db.on('error', () => {
        console.log('error: 数据库连接错误');
    });
    db.on('open', () => {
        console.log('success: 数据库连接成功');
    });
};
