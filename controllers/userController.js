const { User } = require('../models');
const user = require('../models/user');

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

const updateUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      total_score,
      bio,
      location,
      socail_media_url,
    } = req.body;

    const payload = {
      first_name,
      last_name,
      email,
      username,
      password,
      total_score,
      bio,
      location,
      socail_media_url,
    };

    const id = +req.params.id;

    const user = await User.update(payload, { where: { id }, returning: true });

    if (!user) {
      return res.status(404).json(' User Not Found');
    }

    return res.status(200).json(user[1][0]);
  } catch (err) {
    res.statu(400).json({ message: err.message });
  }
};

module.exports = { getAllUser, updateUser };
