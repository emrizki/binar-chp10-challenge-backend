const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
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
    result: 'success',
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
};

const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
    }

    // throw new Error('another error, e.g internal server error');
  } catch (err) {
    return res.status(500).json({
      result: 'failed',
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
      data: {
        first_name,
        last_name,
        email,
        username,
      },
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
        result: 'failed',
        message: 'User Not Found',
      });
    }

    const match = comparePassword(password, user.password);
    if (match) {
      return res.status(200).json(format(user));
    } else {
      return res.status(401).json({
        result: 'failed',
        message: 'Please enter a valid username or password',
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

const loginGoogle = (req, res) => {
  const { tokenId } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  let email = null;
  let first_name = null;
  let last_name = null;
  let username = '';
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      email = payload.email;
      first_name = payload.given_name;
      last_name = payload.family_name;
      username = email.substring(0, email.lastIndexOf('@'));
      return User.findOne({ where: { email } });
    })
    .then((user) => {
      if (!user) {
        return User.create({
          first_name,
          last_name,
          email,
          username,
          password: Math.random() * 1000 + 'google random password secret',
        });
      } else {
        return user;
      }
    })
    .then((user) => {
      res.status(200).json(format(user));
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const currentUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = { index, register, login, loginGoogle, currentUserProfile };
