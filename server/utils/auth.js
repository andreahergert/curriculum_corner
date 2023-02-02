const jwt = require('jsonwebtoken');

// we will want to add this in our final product before deployment on Heroku. This is the part where we add variables under settings in our specific Heroku page. const secret = process.env.JWT_SECRET;

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};