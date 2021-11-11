const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  secretOrKey: 'secret',
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

module.exports = passport;
