const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

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

router.get("/", async (req, res) => {
  const result = await Bus.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateBus(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let bus = new Bus({
    busNumber: req.body.busNumber,
    from: req.body.from,
    to: req.body.to,
    stops: req.body.stops,
    conductor: {
      name: req.body.conductor.name,
      mobile: req.body.conductor.mobile
    }
  });

  const result = await bus.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateBus(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        busNumber: req.body.busNumber,
        from: req.body.from,
        to: req.body.to,
        stops: req.body.stops,
        conductor: {
          name: req.body.conductor.name,
          mobile: req.body.conductor.mobile
        }
      },
      {
        new: true,
        useFindAndModify: false
      }
    );

    if (!result) return res.status(400).send("Invalid Id");

    res.send(result);
  } catch (ex) {
    console.log("Error:", ex);
    return res.status(400).send(ex);
  }
});

router.delete("/:id", async (req, res) => {
  const result = await Bus.findByIdAndRemove(req.params.id, {
    useFindAndModify: false
  });
  if (!result) return res.status(400).send("Invalid Id");
  res.send(result);
});

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

module.exports = router;
