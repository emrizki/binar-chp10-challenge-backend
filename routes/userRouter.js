const router = require('express').Router();
const restrict = require('../middlewares/restrict');
const authorization = require('../middlewares/authorization');
const userController = require('../controllers/userController');

router.get('/:username',userController.findOne);
router.use(restrict);
router.get('/', userController.getAllUser);
router.put('/update/:id', authorization, userController.updateUser);
router.put('/:id/score', userController.updateScore);


module.exports = router;
