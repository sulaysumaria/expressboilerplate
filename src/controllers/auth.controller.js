const mongoose = require('mongoose');

const {encrypt, generateRandomString, hashString} = require('../helpers/excryption.helper');

const User = mongoose.model('user');

module.exports.login = async (req, res) => {
  try {
    const {email, password, deviceId} = req.allParams();

    let user = await User.findOne({email}).select('-__v -createdAt -updatedAt');

    if (!user) {
      return res.error('INVALID_LOGIN_ATTEMPT');
    }

    if (!user.isPasswordValid(password)) {
      return res.error('INVALID_LOGIN_ATTEMPT');
    }

    user = user.toJSON();

    delete user.salt;
    delete user.password;

    const token = encrypt(JSON.stringify({deviceId, userId: user._id, createdAt: Date.now()}));

    return res.ok({message: 'LOGIN_SUCCESS', user, token});
  } catch (e) {
    return res.internalServerError(e);
  }
};

module.exports.logout = async (req, res) => {
  try {
    return res.ok('LOGOUT_SUCCESS');
  } catch (e) {
    return res.internalServerError(e);
  }
};

module.exports.register = async (req, res) => {
  try {
    let {name, email, password} = req.allParams();

    const isEmailAvailable = await User.isEmailAvailable(email);

    if (!isEmailAvailable) {
      return res.error('EMAIL_UNAVAILABLE');
    }

    const salt = generateRandomString(16);
    password = hashString(password, salt);

    await User.create({email, name, password, salt});

    return res.ok('REGISTRATION_SUCCESS');
  } catch (e) {
    return res.internalServerError(e);
  }
};
