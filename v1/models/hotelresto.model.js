const mongoose = require("mongoose");
const _ = require("lodash");
const Autoincrement = require("mongoose-sequence")(mongoose);

const hotelrestoSchema = new mongoose.Schema({
  hotelrestoId: Number,
  name: { type: String, required: true },
  address:String,
  type: String,
  hotelcategory: String,
  restocategory: String,
  streetaddr: String,
  city: String,
  state: String,
  lat: Number,
  long: Number,
  rating: Number,
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  website: String,
  rooms: String,
  features: String,
  cuisine: String,
  timetoVisit: String,
  amenities: String,
  status: Number,
  coordinates: [Number],
  pictures: [String],
  createdAt: { type: Date, default: Date.now() },
});

const countingSchema = {
  id: { type: String },
  seq: { type: Number },
};

const countingModel = mongoose.model("Counting", countingSchema);
const hotelrestoModel = mongoose.model("Hotelresto", hotelrestoSchema);

module.exports = { countingModel, hotelrestoModel };
