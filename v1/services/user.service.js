const _ = require("lodash");
const { encrypt } = require("../helpers/encryption");

const { userModule, pickUser, counterModel } = require("../models//user.model");

const userService = {
  async create(users) {
    console.log(users, "user");

    if (!Array.isArray(users)) {
      users = [users];
    }

    for (const user of users) {
      // Increment userId manually (assuming it's unique)
      const updatedCounter = await counterModel.findOneAndUpdate(
        { id: "autoVal" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const seqId = updatedCounter.seq;
      user.userId = seqId;

      // Encrypt password if available
      if (user?.password) {
        const hash = encrypt(user.password);
        if (hash) user.password = hash;
        else delete user.password;
      }

      // Ensure userId is not set manually
      delete user._id;
    }

    // Insert users into the database
    const result = await userModule.insertMany(users);

    console.log(result, "result");
    return result;
  }, //create user
  async update(id, user) {
    // password encrypt if available
    if (user?.password) {
      const hash = encrypt(user?.password);
      if (hash) user.password = hash;
      else delete user.password;
    }
    const result = await userModule.updateOne({ _id: id }, user);
    return result;
  },
  async delete(id) {
    // Delete the user
    const result = await userModule.deleteOne({ _id: id });

    return result;
  },
  async getOne(id) {
    const result = await userModule.findOne({ _id: id });
    return pickUser(result);
  },
  async getAll(query) {
    const filter = {role: "admin" };
    const result = await userModule.find(filter);
    console.log("res:", result);

    return _.map(result, pickUser);
  },
};

module.exports = userService;
