const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

const format = (user) => {
  const { id, first_name, last_name, email, username } = user;

  const payload = {
    id,
    email,
    username,
  };

  return {
    result: "success",
    message: 'Login Successfully',
    data: {
      id,
      first_name,
      last_name,
      email,
      username,
      accessToken: generateToken(payload),
    },
  };
};

const index = async (req, res) => {
  res.send('Something is cooking inside this kitchen.. Yummy!');
}

const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
      return res
        .status(409)
        .json({
          result: 'failed',
          message: 'The username is already registered'
        });
    }

    // throw new Error('another error, e.g internal server error');
  } catch (err) {
    return res.status(500).json({
      result: 'failed',
      message: 'Oops! Something went wrong',
      error: err.message,
    });
  }

  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      username,
      password,
    });

    return res.status(201).json({
      result: 'success',
      message: 'Congratulations, your account has been successfully created.',
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      result: 'failed',
      message:
        'Registration Failed, Please go back and double check your information and make sure that is valid',
      error: err.errors[0].message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        result: "failed",
        message: 'User Not Found'
      });
    }

    // throw new Error('another error, e.g internal server error');

    const match = comparePassword(password, user.password);
    if (match) {
      return res.status(201).json(format(user));
    } else {
      return res
        .status(401)
        .json({
          result: 'failed',
          message: 'Please enter a valid username or password'
        });
    }
  } catch (err) {
    return res.status(500).json({
      result: 'failed',
      message: 'Oops! Something went wrong',
      error: err.message,
    });
  }
};

module.exports = { index, register, login };
