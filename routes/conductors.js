const express = require("express");
const { Conductor, validate } = require("../models/conductors");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Conductor.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
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
  const { error } = validate(req.body);
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

module.exports = router;
