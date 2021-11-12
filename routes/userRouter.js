const router = require("express").Router();
const user = require('../controllers/userController.js');

router.get('/:id',user.findOne);

module.exports = router;