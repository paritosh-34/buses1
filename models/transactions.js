const Joi = require("joi");
const mongoose = require("mongoose");

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

exports.Transaction = Transaction;
exports.validate = validateTransaction;
