const mongoose = require("mongoose");
const _ = require("lodash");
const Autoincrement = require("mongoose-sequence")(mongoose);

const hotelrestoSchema = new mongoose.Schema({
  hotelrestoId: Number,
  name: { type: String, required: true },
  type: String,
  streetaddr: String,
  city: String,
  state: String,
  pincode: Number,

  // location: [
  //   {
  //     lat: Number,
  //     long: Number,
  //   },
  // ],
  
  rating:Number,
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  website: String,
  rooms:String,
  features: String,
  cuisine: String,
  timetovisit: String,
  amenities: String,
  status: Number,
  pictures: [String],
  createdAt: { type: Date, default: Date.now() },
});

hotelrestoSchema.plugin(Autoincrement, { inc_field: "hotelrestoId" });
module.exports = mongoose.model("Hotelresto", hotelrestoSchema);
