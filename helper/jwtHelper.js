const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const encodeJWT = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const decodeJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { encodeJWT, decodeJWT };
