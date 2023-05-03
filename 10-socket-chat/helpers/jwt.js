const jwt = require('jsonwebtoken');
const User = require('../models/users');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(payload, process.env.SECRET, {
      expiresIn: '4h',
    }, (err, token) => {
      if (err) {
        reject('Token could not be generated');
      } else {
        resolve(token);
      }
    });
  });
};

const validateSocketToken = async (token = '') => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRET);

    const authenticated = await User.findById(uid);

    if (!authenticated || !authenticated.status) {
      return null;
    }

    return authenticated;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  generateJWT,
  validateSocketToken,
}