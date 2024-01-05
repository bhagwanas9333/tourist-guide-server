const { placeModel, countModel } = require("../models/place.model");

const placeService = {
  async create(places) {
    if (!Array.isArray(places)) {
      places = [places];
      for (const place of places) {
        // Increment userId manually (assuming it's unique)
        const count = await countModel.findOneAndUpdate(
          { id: "autoVal" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

        const seqId = count.seq;
        place.placeId = seqId;
      }
    }
    const result = await placeModel.insertMany(places);
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
    const { lat, long } = query;
    if (lat) {
      const places = await placeModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(long), parseFloat(lat)],
            },
            distanceField: "dist.calculated",
            maxDistance: 50000,
            includeLocs: "dist.location",
            spherical: true,
          },
        },
      ]);

      return places;
    } else {
      const filter = {};
      const result = await placeModel.find(filter);
      return result;
    }
  },
};

module.exports = placeService;
