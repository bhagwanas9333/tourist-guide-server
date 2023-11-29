const jwt = require("jsonwebtoken");

const createToken = () => {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn });
  } catch (error) {
    console.error(error);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createToken, verifyToken };
