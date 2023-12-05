const mongoose = require("mongoose");
const _ = require("lodash");
const { number } = require("joi");
// const Autoincrement = require("mongoose-sequence")(mongoose);

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  address: [
    {
      streetaddr: String,
      city: String,
      state: String,
      postalcode: Number,
    },
  ],
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
  contact: [
    {
      mobile: { type: String, unique: true },
      email: { type: String, unique: true },
      website: String,
    },
  ],
  cuisine: [
    {
      indian: Boolean,
      italian: Boolean,
      french: Boolean,
      japanese: Boolean,
      chinese: Boolean,
      american: Boolean,
      thai: Boolean,
    },
  ],
  openingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },

  features: [
    {
      outdoorseating: Boolean,
      privatedining: Boolean,
      bar: Boolean,
    },
  ],
  status: Number,
  picture: [String],
  createdAt: { type: Date, default: Date.now() },
});

// restaurantSchema.plugin(Autoincrement, { inc_field: "restaurantId" });
module.exports = mongoose.model("Restaurant", restaurantSchema);
