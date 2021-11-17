const { User, Detail } = require('../models');

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
      return res.status(404).json({ message: ' User Not Found' });
    }
    return res.status(200).json({
      message: 'Congratulations, your account has been successfully updated.',
      data: user[1][0],
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Oops! Something went wrong',
      errorMessage: err.errors[0].message,
    });
  }
};

const findOne = (req, res) => {
  User.findAll({
    where: {
      username: req.params.username,
    },
  })
    .then((data) => {
      res.status(200).json({
        result: 'success',
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: 'failed',
        message: err.message || 'some error occured while retrieving game',
      });
    });
};

const getLeaderboard = (req, res) => {
  User.findAll({
    order: [['total_score', 'DESC']],
  })
    .then((data) => {
      res.status(200).json({
        result: 'success',
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: 'failed',
        message: err.message || 'some error occured while retrieving game',
      });
    });
};

const updateScore = async (req, res) => {
  let user = await Detail.findOne({
    attributes: ['score'],
    where: {
      userId: req.params.id,
      gameId: req.body.gameId,
    },
  });

  Detail.update(
    {
      score: parseInt(req.body.score) + user['score'],
    },
    {
      where: {
        userId: req.params.id,
        gameId: req.body.gameId,
      },
      returning: true,
    }
  )
    .then((data) => {
      res.status(200).json({
        result: 'success',
        data: {
          score: data[1][0].score,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        result: 'failed',
        message: err.message || 'some error occured while retrieving game',
      });
    });
};

module.exports = {
  findOne,
  getLeaderboard,
  getAllUser,
  updateUser,
  updateScore,
};
