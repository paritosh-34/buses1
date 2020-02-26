const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  lat: Number,
  lon: Number
});

const Location = mongoose.model("locations", locationSchema);

function validateLocation(location) {
  const schema = {
    lat: Joi.number(),
    lon: Joi.number()
  };
  return Joi.validate(location, schema);
}

exports.Location = Location;
exports.validate = validateLocation;