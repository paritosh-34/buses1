const express = require("express");
const Location = require("../routes/locations").Location;
const User = require("../routes/users").User;
const Conductor = require("../routes/conductors").Conductor;
const Bus = require("../routes/buses").Bus;
const Transaction = require("../routes/transactions").Transaction;

const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find();
  const users = await User.find();
  const conductors = await Conductor.find();
  const buses = await Bus.find();
  const transactions = await Transaction.find();
  res.render("table.html", { locations: locations, users: users, conductors: conductors, buses: buses, transactions: transactions });
});

module.exports.router = router;
