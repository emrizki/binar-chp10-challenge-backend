const router = require('express').Router();
const GameController = require('../controllers/game');

router.get('/', GameController.getAll);

module.exports = router;
