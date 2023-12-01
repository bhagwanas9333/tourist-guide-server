const mongoose = require("mongoose");
const _ = require("lodash");
const Autoincrement = require("mongoose-sequence")(mongoose);


const hotelSchema = new mongoose.Schema({
    hotelId: Number,
    name: { type: String, required: true },
    category: String,
    address:[
        {
            streetaddr:String,
            state: String,
            city: String,
            postalcode: Number,
        }
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
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    website:String,
    // rooms:[
    //     {
    //         standard:Number,
    //         deluxe:Number,
    //         suite:Number,

    //     },
    // ],
    amenities:String,
    picture: String,
    createdAt: { type: Date, default: Date.now() },
  });
  
  hotelSchema.plugin(Autoincrement, { inc_field: "hotelId" });
  module.exports = mongoose.model("Hotel", hotelSchema);
  