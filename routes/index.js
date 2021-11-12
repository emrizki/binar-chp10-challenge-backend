const router = require('express').Router();
const authRouter = require('./authRouter');
const game = require('./gameRouter');
const user = require('./userRouter');

router.use('/', authRouter);
router.use('/game', game);
router.use('/user', user);

module.exports = router;
