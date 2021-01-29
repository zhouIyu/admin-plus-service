const Router = require('@koa/router');
const router = new Router();
const Role = require('../controller/role');
const validator = require('../middlewares/validator');
const {
    create,
    list
} = require('../schema/role');

router.prefix('/role');

router.get('/list', validator(list), Role.getRoleList);
router.post('/create', validator(create), Role.createRole);
router.put('/update/:role_id', Role.updateRoleById);
router.delete('/remove/:role_id', Role.removeRole);

module.exports = router;
