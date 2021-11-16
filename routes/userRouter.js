const router = require('express').Router();
const restrict = require('../middlewares/restrict');
const authorization = require('../middlewares/authorization');
const userController = require('../controllers/userController');


router.use(restrict);
router.get('/', userController.getAllUser);
router.get('/:id',userController.findOne);
router.put('/update/:id', authorization, userController.updateUser);
router.put('/:id/score', userController.updateScore);


module.exports = router;
