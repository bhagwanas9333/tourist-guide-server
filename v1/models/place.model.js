const mongoose = require("mongoose");
const _ = require("lodash");
const Autoincrement = require("mongoose-sequence")(mongoose);
const placeSchema = new mongoose.Schema({
  placeId: Number,
  name: { type: String, required: true },
  state: String,
  city: String,
  category: String,
  about: String,
  timeToVisit: String,
  food: String,
  location: [
    {
      lat: Number,
      long: Number,
    },
  ],
  ratings: [
    {
      rate: Number,
      review: String,
    },
  ],
  status: Number,
  pictures: [String],
  createdAt: { type: Date, default: Date.now() },
});

const countSchema = {
  id: { type: String },
  seq: { type: Number },
};

const countModel = mongoose.model("Count", countSchema);
const placeModel = mongoose.model("Place", placeSchema);

module.exports = { countModel, placeModel };
