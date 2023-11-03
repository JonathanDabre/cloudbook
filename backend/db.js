const mongoose = require('mongoose')


// Local mongo uri
// const mongoURI = "mongodb://0.0.0.0:27017/inotebook";

// Mongo Atlas URI
// const mongoURI = "mongodb+srv://admin:admin@cluster0.ahoswxr.mongodb.net/?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://crce9529ce:aX6X5jBaUfiHuFGC@cluster0.a5yhc7z.mongodb.net/?retryWrites=true&w=majority"

// This file is to establish connection with mongo database

const connectToMongo = async () => {
   await mongoose.connect(mongoURI, await console.log("Connected to mongo successfully"))
  
}


module.exports = connectToMongo;