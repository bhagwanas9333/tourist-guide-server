const mongoose = require("mongoose");
const _ = require("lodash");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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

// Add the mongoose-sequence plugin to the user schema
userSchema.plugin(AutoIncrement, { inc_field: "userId" });

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
    "password",
    "role",
    "createdAt",
  ]);
};

module.exports = { userModule, pickUser };
