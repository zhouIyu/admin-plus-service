const path = require('path');
const glob = require('glob');

class Utils {
    static loadFiles (dirPath) {
        const _path = path.resolve(__dirname, '..', dirPath);
        const pattern = `${_path}/*.js`;
        return glob.sync(pattern);
    };
}

module.exports = Utils;
