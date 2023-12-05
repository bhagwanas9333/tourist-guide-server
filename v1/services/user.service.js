const _ = require("lodash");
const { encrypt } = require("../helpers/encryption");

const { userModule, pickUser } = require("../models/user.model");

const userService = {
  async create(user) {
    if (Array.isArray(user)) {
      // multiple users
      for (const u of user) {
        if (u?.password) {
          const hash = encrypt(u?.password);
          if (hash) u.password = hash;
          else delete u.password;
        }
      }
    } else {
      //single user
      if (user?.password) {
        const hash = encrypt(user?.password);
        if (hash) user.password = hash;
        else delete user.password;
      }
      user = [user];
    }
    const result = await userModule.insertMany(user);
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
    return result;
  },
  async getAll(query) {
    const filter = {};
    const result = await userModule.find(filter);
    console.log("res:", result);

    return _.map(result, pickUser);
  },
};

module.exports = userService;
