const hotelrestoModel = require("../models/hotelresto.model");

const hotelrestoService = {
  async create(hotelresto) {
    if (Array.isArray(hotelresto)) {
      hotelresto = [hotelresto];
    }
    const result = await hotelrestoModel.insertMany(hotelresto);
    console.log("result",result);
    
    return result;
  }, //create
  async update(id, hotelresto) {
    const result = await hotelrestoModel.updateOne({ _id: id }, hotelresto);
    return result;
  }, //update
  async delete(id) {
    const result = await hotelrestoModel.deleteOne({ _id: id });
    return result;
  }, //delete
  async getOne(id) {
    const result = await hotelrestoModel.findOne({ _id: id });
    return result;
  }, //getOne
  async getAll(query) {
    const { type } = query;
    console.log("typegetall",query);
    const filter = {};
    if (type) {
      const typeArr = type?.split(",").filter((V) => V);
      filter.type = { $in: typeArr };
      console.log("typeArr",typeArr);  
    }
    const result = await hotelrestoModel.find(filter).populate()
    return result;
  }, //getAll
};
module.exports = hotelrestoService;
