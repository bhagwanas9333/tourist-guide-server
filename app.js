const express = require("express");
// const mongoose = require('mongoose');

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({
  path: "./config/.env",
});

const app = express();
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// app.post('/api/places/nearby', async (req, res) => {
//   const { latitude, longitude } = req.body;

//   try {
//     const places = await Place.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: 'Point',
//             coordinates: [longitude, latitude],
//           },
//           $maxDistance: 5000, // Maximum distance in meters (adjust as needed)
//         },
//       },
//     });

//     res.json({ places });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  // console.log("req.body..", req.body);
  //access client to access the "x-token" to header
  res.header("Access-Control-Expose-Headers", "x-accesstoken,x-refreshtoken");
  next();
});

const port = process.env.PORT || 9090;

// http://localhost:8888/api/v1
app.use("/api/v1", require("./v1"));

app.get("/", (req, res) => {
  res.status(200).send("welcome to sever");
});

app.listen(port, () => {
  console.log(`server is listing on port ${port}`);
});
