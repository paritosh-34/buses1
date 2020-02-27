const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number
});

const Location = mongoose.model("locations", locationSchema);

let ll = new Location({
  lat: 30.5154156,
  lon: 76.6555297
});

function validateLocation(location) {
  const schema = {
    name: Joi.string(),
    lat: Joi.number(),
    lon: Joi.number(),
  };
  return Joi.validate(location, schema);
}

exports.Location = Location;
exports.validate = validateLocation;