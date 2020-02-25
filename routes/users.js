const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    requred: true,
    minlength: 5,
    maxlength: 255
  },
  mobile: {
    type: Number,
    require: true
  },
  DOB: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"]
  },
  city: {
    type: String,
    required: true
  }
});

const User = mongoose.model("users", userSchema);

const user = new User({
  name: "paritosh",
  mobile: 8146990621,
  DOB: new Date(2000, 3, 20),
  gender: "male",
  city: "Chandigarh"
});

async function createUser() {
  const result = await user.save();
  console.log(result);
}
// createUser();

router.get("/", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    mobile: req.body.mobile,
    DOB: new Date(req.body.DOB.year, req.body.DOB.month, req.body.DOB.day),
    gender: req.body.gender,
    city: req.body.city
  });

  const result = await user.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        mobile: req.body.mobile,
        DOB: new Date(req.body.DOB.year, req.body.DOB.month, req.body.DOB.day),
        gender: req.body.gender,
        city: req.body.city
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
  const result = await User.findByIdAndRemove(req.params.id, {
    useFindAndModify: false
  });
  if (!result) return res.status(400).send("Invalid Id");
  res.send(result);
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    mobile: Joi.number().required(),
    DOB: {
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required()
    },
    gender: Joi.string()
      .valid("male", "female", "others")
      .required(),
    city: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

module.exports.router = router;
module.exports.User = User;
