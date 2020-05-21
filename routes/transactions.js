const express = require("express");
const { Transaction, validate } = require("../models/transactions");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Transaction.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let transaction = new Transaction({
    user: {
      name: req.body.user.name,
      mobile: req.body.user.mobile
    },
    conductor: {
      name: req.body.conductor.name,
      mobile: req.body.conductor.mobile
    },
    amount: req.body.amount,
    bus: {
      busNumber: req.body.bus.busNumber,
      from: req.body.bus.from,
      to: req.body.bus.to
    },
    from: req.body.from,
    to: req.body.to
  });

  const result = await transaction.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        user: {
          name: req.body.user.name,
          mobile: req.body.user.mobile
        },
        conductor: {
          name: req.body.conductor.name,
          mobile: req.body.conductor.mobile
        },
        amount: req.body.amount,
        bus: {
          busNumber: req.body.bus.busNumber,
          from: req.body.bus.from,
          to: req.body.bus.to
        },
        from: req.body.from,
        to: req.body.to
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
  const result = await Transaction.findByIdAndRemove(req.params.id, {
    useFindAndModify: false
  });
  if (!result) return res.status(400).send("Invalid Id");
  res.send(result);
});

module.exports = router;
