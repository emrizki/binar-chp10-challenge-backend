const router = require('express').Router();
const restrict = require('../middlewares/restrict');
const authorization = require('../middlewares/authorization');
const userController = require('../controllers/userController');

router.use(restrict);
router.get('/', userController.getAllUser);
router.put('/update/:id', authorization, userController.updateUser);

module.exports = router;
