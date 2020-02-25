const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const transactionSchema = mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    }
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
  },
  amount: {
    type: Number,
    required: true
  },
  bus: {
    busNumber: String,
    from: String,
    to: String
  },
  from: {
    type: String,
    requred: true
  },
  to: {
    type: String,
    required: true
  }
});

const Transaction = mongoose.model("transactions", transactionSchema);

const transaction = new Transaction({
  user: {
    name: "Paritosh",
    mobile: 8146990621
  },
  conductor: {
    name: "Rampal",
    mobile: 8246235689
  },
  amount: 50,
  bus: {
    busNumber: "MH 14 GU 7694",
    from: "Chandigarh",
    to: "Patiala"
  },
  from: "Banur",
  to: "Chandigarh"
});

async function newTransaction() {
  const result = await transaction.save();
  console.log(result);
}
// newTransaction();

router.get("/", async (req, res) => {
  const result = await Transaction.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateTransaction(req.body);
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
  const { error } = validateTransaction(req.body);
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

function validateTransaction(transaction) {
  const schema = {
    user: {
      name: Joi.string().required(),
      mobile: Joi.number().required()
    },
    conductor: {
      name: Joi.string().required(),
      mobile: Joi.number().required()
    },
    amount: Joi.number().required(),
    bus: {
      busNumber: Joi.string(),
      from: Joi.string(),
      to: Joi.string()
    },
    from: Joi.string(),
    to: Joi.string()
  };
  return Joi.validate(transaction, schema);
}

module.exports = router;
