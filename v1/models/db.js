const mongoose = require("mongoose");

const url = "mongodb+srv://bhagwans9333:bhagwan$9282@touristguide.qmzutve.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);

const conn =mongoose.connection

conn.on("connected",()=>{
    console.log("Connected to DB");
})


conn.on("disconnected",()=>{
    console.log("Disconnected from DB");
})


conn.on("error",()=>{
    console.log("Could not Connected to DB");
})
