const router = require('express').Router();
const restrict = require('../middlewares/restrict');
const authorization = require('../middlewares/authorization');
const userController = require('../controllers/userController');


router.put('/:id/score', userController.updateScore);
router.use(restrict);
router.get('/', userController.getAllUser);
router.put('/update/:id', authorization, userController.updateUser);
router.get('/leaderboard', userController.getLeaderboard);
router.get('/:id',userController.findOne);


module.exports = router;
