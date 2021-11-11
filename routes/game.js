const router = require("express").Router();
const game = require('../controllers/game');

router.get('/', game.findAll);
router.get('/:id',game.findOne);


module.exports = router;