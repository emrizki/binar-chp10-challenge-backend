const router = require("express").Router();
const game = require('../controllers/gameController');

router.get('/', game.findAll);
router.get('/:id',game.findOne);
router.get('/:id/leaderboard', game.getLeaderboard);

module.exports = router;