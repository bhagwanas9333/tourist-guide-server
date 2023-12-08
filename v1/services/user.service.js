const _ = require("lodash");
const { encrypt } = require("../helpers/encryption");

const {
  userModule,
  pickUser,
  incrementUserId,
} = require("../models//user.model");

const userService = {
  async create(users) {
    console.log(users, "user");

    if (!Array.isArray(users)) {
      users = [users];
    }

    for (const user of users) {
      // Increment userId manually (assuming it's unique)
      const lastUser = await userModule.findOne(
        {},
        {},
        { sort: { userId: -1 } }
      );
    
      const lastUserId =
        lastUser && typeof lastUser.userId === "number" ? lastUser.userId : 0;
      user.userId = lastUserId + 1;

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
    const result = await userModule.deleteOne({ _id: id });
    return result;
  },
  async getOne(id) {
    const result = await userModule.findOne({ _id: id });
    return pickUser(result);
  },
  async getAll(query) {
    const filter = {};
    const result = await userModule.find(filter);
    console.log("res:", result);

    return _.map(result, pickUser);
  },
};

module.exports = userService;
