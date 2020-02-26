const express = require("express");
const { Location } = require("../models/locations");
const { User } = require("../models/users");
const { Conductor } = require("../models/conductors");
const { Bus } = require("../models/buses");
const { Transaction } = require("../models/transactions");

const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find();
  const users = await User.find();
  const conductors = await Conductor.find();
  const buses = await Bus.find();
  const transactions = await Transaction.find();
  res.render("table.html", {
    locations: locations,
    users: users,
    conductors: conductors,
    buses: buses,
    transactions: transactions
  });
});

module.exports = router;
