const Joi = require("joi");
const mongoose = require("mongoose");

const conductorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  busNumber: {
    type: String,
    required: true
  }
});

const Conductor = mongoose.model("conductors", conductorSchema);

const conductor = new Conductor({
  name: "Rampal",
  mobile: 8246235689,
  busNumber: "MH 14 GU 7694"
});

async function createConductor() {
  const result = await conductor.save();
  console.log(result);
}
// createConductor();

function validateConductor(cond) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    mobile: Joi.number().required(),
    busNumber: Joi.string().required()
  };
  return Joi.validate(cond, schema);
}

exports.Conductor = Conductor;
exports.validate = validateConductor;