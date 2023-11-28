const placeModel = require("../models/place.model");

const placeService = {
  async create(place) {
    if (Array.isArray(place)) {
      place = [place];
    }
    const result = await placeModel.insertMany(place);
    return result;
  }, //create
  async update(id, place) {
    // update the dish
    const result = await placeModel.updateOne({ _id: id }, place);
    return result;
  }, //update
  async delete(id) {
    const result = await placeModel.deleteOne({ _id: id });
    return result;
  }, //delete
  async getOne(id) {
    const result = await placeModel.findOne({ _id: id });
    return result;
  }, //getOne
  async getAll(query) {
    const filter = {};
    const result = await placeModel.find(filter);
    return result;
  }, //getAll
};

module.exports = placeService;
