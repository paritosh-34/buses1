const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

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

router.get("/", async (req, res) => {
  const result = await Conductor.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateConductor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let conductor = new Conductor({
    name: req.body.name,
    mobile: req.body.mobile,
    busNumber: req.body.busNumber
  });

  const result = await conductor.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateConductor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await Conductor.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        mobile: req.body.mobile,
        busNumber: req.body.busNumber
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
  const result = await Conductor.findByIdAndRemove(req.params.id, {
    useFindAndModify: false
  });
  if (!result) return res.status(400).send("Invalid Id");
  res.send(result);
});

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

module.exports.router = router;
module.exports.Conductor = Conductor;
