const express = require("express");
const { Bus, validate } = require("../models/buses");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Bus.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
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
  const { error } = validate(req.body);
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

module.exports = router;
