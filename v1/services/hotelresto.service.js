const {
  hotelrestoModel,
  countingModel,
} = require("../models/hotelresto.model");

const hotelrestoService = {
  async create(hotelresto) {
    if (!Array.isArray(hotelresto)) {
      hotelresto = [hotelresto];

      for (const h of hotelresto) {
        // Increment userId manually (assuming it's unique)
        const count = await countingModel.findOneAndUpdate(
          { id: "autoVal" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

        const seqId = count.seq;
        h.hotelrestoId = seqId;
      }
    }

    const result = await hotelrestoModel.insertMany(hotelresto);
    console.log("result", result);

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
    const filter = {};
    const result = await hotelrestoModel.find(filter);
    return result;
  }, //getAll
};
module.exports = hotelrestoService;
