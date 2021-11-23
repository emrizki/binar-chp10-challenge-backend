const router = require('express').Router();
const restrict = require('../middlewares/restrict');
const authorization = require('../middlewares/authorization');
const userController = require('../controllers/userController');

router.get('/:username',userController.findOne);
router.get('/', userController.getAllUser);
router.use(restrict);
router.put('/:id', authorization, userController.updateUser);


module.exports = router;
