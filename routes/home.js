const express = require("express");
const { Location } = require("../models/locations");
const { User } = require("../models/users");
const { Conductor } = require("../models/conductors");
const { Bus } = require("../models/buses");
const { Transaction } = require("../models/transactions");

const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find()
    .sort("-time")
    .limit(20);
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

router.get("/locations", async (req, res) => {
  const locations = await Location.find().sort("-time");
  res.render("locations.html", { locations: locations });
});

router.get("/map", (req, res) => {
  res.render("maps.html");
});

router.get("/testL/Paritosh", async (req, res) => {
  const result = await Location.find({ name: "Paritosh" }).sort("-time");
  res.send(result);
});

router.get("/testL/Akash", async (req, res) => {
  const result = await Location.find({ name: "Akash" }).sort("-time");
  res.send(result);
});

router.get("/testL/Nakul", async (req, res) => {
  const result = await Location.find({ name: "Nakul" }).sort("-time");
  res.send(result);
});

router.get("/test", (req, res) => {
  res.render("test_socket.html");
});

router.get("/realtime", (req, res) => {
  res.render("realtime.html");
});

router.get("/map2", (req, res) => {
  res.render("maps2.html");
});

module.exports = router;
