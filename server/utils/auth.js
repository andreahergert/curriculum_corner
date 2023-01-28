const jwt = require("jsonwebtoken");

// set token secret and expiration date
// we will want to add this in our final product before deployment on Heroku. This is the part where we add variables under settings in our specific Heroku page. const secret = process.env.JWT_SECRET;
const secret = 'mysecretssshhhhhhh';
const expiration = "2h";

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers (we may end up changing the headers in the depending req.headers.authorization on the page structure)
    let token = req.query.token || req.headers.authorization || req.body.token;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return console.error({ message: "invalid token!" });
    }

    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};