const bcrypt = require("bcryptjs");
const { log } = require("console");

const encrypt = (text) => {
  try {
    return bcrypt.hashSync(text);
  } catch (error) {
    console.error(error);
  }
};

const compare = (text, hash) => {
  try {
    return bcrypt.compareSync(text, hash);
  } catch (error) {
    console.error(error);
  }
  return false;
};


module.exports={encrypt,compare}