const mongoose = require("mongoose");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: String,
    last: String,
  },
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  status: Number,
  avatar: String,
  role: String,
  createdAt: { type: Date, default: Date.now() },
});

const userModule = mongoose.model("User", userSchema);

const pickUser = (user) => {
  return _.pick(user, [
    "_id",
    "userId",
    "name",
    "mobile",
    "email",
    "status",
    "avatar",
    "role",
    "createdAt",
  ]);
};

module.exports = { userModule, pickUser };
