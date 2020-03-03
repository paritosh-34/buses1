const express = require("express");
const { Location } = require("../models/locations");
const { User } = require("../models/users");
const { Conductor } = require("../models/conductors");
const { Bus } = require("../models/buses");
const { Transaction } = require("../models/transactions");

const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find().sort('-time').limit(20);
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

router.get("/map", (req, res) => {
  res.render("maps.html")
})

router.get("/map2", (req, res) => {
  res.render("maps2.html")
})

module.exports = router;
