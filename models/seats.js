const mongoose = require("mongoose");

const seatsSchema = mongoose.Schema({
  no: {
    type: String
  },
  info: {
    type: Number
  }
});

const Seats = mongoose.model("seats", seatsSchema);

exports.Seats = Seats;