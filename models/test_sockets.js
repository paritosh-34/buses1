const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number,
  time: Date
});

const TestSocket = mongoose.model("testSocket", schema);

module.exports = TestSocket;
