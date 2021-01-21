const Koa = require('koa');
const config = require('config');
const cors = require('@koa/cors');
const body = require('koa-body');
const db = require('./utils/db');
const errorHandle = require('./middlewares/errorHandle');
const auth = require('./middlewares/auth');
const loadRoutes = require('./utils/router');

class App {
    constructor (app) {
        this.app = app;
    }

    use (middleware) {
        this.app.use(middleware);
    }

    preMiddleware () {
        this.use(body({}));
        this.use(cors());
        this.use(errorHandle());
        this.use(auth());
    }

    init () {
        db(config.get('db.uri'));
        this.preMiddleware();
        loadRoutes(this.app);
    }

    start () {
        this.init();
        const port = config.get('port');
        this.app.listen(port, () => {
            console.log(`running in http://localhost:${port}`);
        });
    }
}
const app = new App(new Koa());
app.start();
