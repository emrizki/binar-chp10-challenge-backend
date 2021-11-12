const router = require("express").Router();
const game = require('../controllers/userController.js');

router.get('/:id',user.findOne);

module.exports = router;