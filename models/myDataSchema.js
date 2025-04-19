const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema structure
const articalSchema = new Schema({
  userNaaaaame: String,
});

// Create a model based on that Schema
const Mydata = mongoose.model("Mydataaa", articalSchema);

// export the model
module.exports = Mydata;
