const router = require('express').Router();
const authRouter = require('./authRouter');
const game = require('./gameRouter');

router.use('/', authRouter);
router.use('/game', game);

module.exports = router;
