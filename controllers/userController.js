const { User } = require('../models');

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      res.status(404).json({ message: 'no user registered yet' });
    }

    return res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllUser };
