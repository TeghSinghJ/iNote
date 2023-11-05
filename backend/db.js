const mongoose = require('mongoose');
const mongoUri ="mongodb://0.0.0.0:27017/inotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, console.log("Connected to MongoDB successfully!"));
}

module.exports = connectToMongo;