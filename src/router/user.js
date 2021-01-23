const Router = require('@koa/router');
const router = new Router();
const User = require('../controller/user');
const validator = require('../middlewares/validator');
const {
    register,
    login,
    list
} = require('../schema/user');

router.prefix('/user');

router.get('/mine', User.mine);
router.post('/create', validator(register), User.register);
router.post('/login', validator(login), User.login);
router.get('/list', validator(list), User.getUserList);
router.get('/:user_id/info', User.getUserInfoById);
router.put('/:user_id', User.updateUserById);

module.exports = router;
