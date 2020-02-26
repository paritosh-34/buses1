const Joi = require("joi");
const mongoose = require("mongoose");

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

exports.User = User;
exports.validate = validateUser;