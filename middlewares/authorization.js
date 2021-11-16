const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await User.findOne({ where: { id } });
    if (user.id === req.user.id) {
      next();
    }
  } catch (err) {
    res
      .status(401)
      .json({
        message: 'Hey you!, stop right there. Authorized required',
        errorMessage: err.message,
      });
  }
};