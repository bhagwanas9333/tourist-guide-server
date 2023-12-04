const restaurantModel = require("../models/restaurant.model");

const restaurantService = {
  async create(restaurant) {
    if (Array.isArray(restaurant)) {
      restaurant = [restaurant];
    }
    const result = await restaurantModel.insertMany(restaurant);
    console.log("result", result);
    return result;
  }, //create
  async update(id, restaurant) {
    // update the dish
    const result = await restaurantModel.updateOne({ _id: id }, restaurant);
    return result;
  }, //update
  async delete(id) {
    const result = await restaurantModel.deleteOne({ _id: id });
    return result;
  }, //delete
  async getOne(id) {
    const result = await restaurantModel.findOne({ _id: id });
    return result;
  }, //getOne
  async getAll(query) {
    const filter = {};
    const result = await restaurantModel.find(filter);
    return result;
  }, //getAll
};

module.exports = restaurantService;
