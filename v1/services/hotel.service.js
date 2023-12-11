const hotelModel = require("../models/hotel.model");

const hotelService = {
  async create(hotel) {
    if (Array.isArray(hotel)) {
      hotel = [hotel];
    }
    const result = await hotelModel.insertMany(hotel);
    console.log("result",result);
    
    return result;
  }, //create
  async update(id, hotel) {
    // update the dish
    const result = await hotelModel.updateOne({ _id: id }, hotel);
    return result;
  }, //update
  async delete(id) {
    const result = await hotelModel.deleteOne({ _id: id });
    return result;
  }, //delete
  async getOne(id) {
    const result = await hotelModel.findOne({ _id: id });
    return result;
  }, //getOne
  async getAll(query) {
    const filter = {};
    const result = await hotelModel.find(filter);
    return result;
  }, //getAll
};

module.exports = hotelService;
