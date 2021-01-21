const Utils = require('./index');
const Router = require('@koa/router');
const router = new Router();

module.exports = function loadRoutes (app) {
    const files = Utils.loadFiles('router');
    files.forEach(file => {
        const current = require(file);
        router.use(current.routes(), current.allowedMethods());
    });
    app.use(router.routes(), router.allowedMethods());
};
