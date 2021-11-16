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

const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
      return res
        .status(409)
        .json({ message: 'The username is alredy registerd' });
    }
  } catch (err) {
    return res.status(400).json({
      message:
        'Registration Failed, Please go back and double check your information and make sure that is valid',
      errorMessage: err.message,
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
      message: 'Congratulations, your account has been successfully created.',
      data: { user },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', errorMessage: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    const match = comparePassword(password, user.password);

    if (match) {
      return res.json(format(user));
    } else {
      return res
        .status(401)
        .json({ message: 'Please enter a valid username or password' });
    }
  } catch (err) {
    return res
      .staus(500)
      .json({ message: 'Internal Server Error', errorMessage: err.message });
  }
};
module.exports = { register, login };
