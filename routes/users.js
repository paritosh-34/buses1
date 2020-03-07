const express = require("express");
const { User, validate } = require("../models/users");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    mobile: req.body.mobile,
    DOB: new Date(req.body.DOB),
    gender: req.body.gender,
    city: req.body.city,
    password: req.body.password
  });

  const result = await user.save();
  return res.redirect("/");
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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
  try {
    const result = await User.findByIdAndRemove(req.params.id, {
      useFindAndModify: false
    });
    if (!result) return res.status(400).send("Invalid Id");
    res.send(result);
  } catch (err) {
    console.log("Error: ", err);
    res.send(err);
  }
});

module.exports = router;
