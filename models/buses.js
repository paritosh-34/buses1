const Joi = require("joi");
const mongoose = require("mongoose");

const busSchema = mongoose.Schema({
  busNumber: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  stops: {
    type: [String]
  },
  conductor: {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    }
  }
});

const Bus = mongoose.model("buses", busSchema);

const bus = new Bus({
  busNumber: "MH 14 GU 7694",
  from: "Chandigarh",
  to: "Patiala",
  stops: ["Zirakpur", "Banur", "Rajpura"],
  conductor: {
    name: "Rampal",
    mobile: 8246235689
  }
});

async function createBus() {
  const result = await bus.save();
  console.log(result);
}
// createBus();

function validateBus(bus) {
  const schema = {
    busNumber: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    stops: Joi.array(),
    conductor: {
      name: Joi.string(),
      mobile: Joi.number()
    }
  };
  return Joi.validate(bus, schema);
}

exports.Bus = Bus;
exports.validate = validateBus;