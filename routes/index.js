const router = require('express').Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const game = require('./gameRouter');

router.use('/', authRouter);
router.use('/game', game);
router.use('/user', userRouter);

module.exports = router;
