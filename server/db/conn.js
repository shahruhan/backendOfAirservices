// *************DataBase Connection*************
// var kennel = require("../mongoose/src/model.js");
const mongoose = require("mongoose");

// for atlas connection online with password"

const DB = 'mongodb+srv://shahruhan:ruhi2324@cluster0.ias3lfx.mongodb.net/airService?retryWrites=true&w=majority';

// const DB = process.env.DATABASE;

mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
