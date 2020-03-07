const express = require("express");
const session = require("express-session");

const { Location } = require("../models/locations");
const { User } = require("../models/users");
const { Conductor } = require("../models/conductors");
const { Bus } = require("../models/buses");
const { Transaction } = require("../models/transactions");

const router = express.Router();

router.get("/admin", async (req, res) => {
  if (req.session._id === "5e63adda4f8fb2266eb514eb") {
    const locations = await Location.find()
      .sort("-time")
      .limit(20);
    const users = await User.find();
    const conductors = await Conductor.find();
    const buses = await Bus.find();
    const transactions = await Transaction.find();
    return res.render("table.html", {
      locations: locations,
      users: users,
      conductors: conductors,
      buses: buses,
      transactions: transactions
    });
  }
  return res.redirect("/");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const result = await User.find({
    name: req.body.username,
    password: req.body.password
  });
  if (result[0]) {
    console.log(result[0]);
    req.session._id = result[0]._id;
    return res.redirect("/mappage");
  } else return res.render("home.html", { i: "Invalid id/password" });
});

router.get("/mappage", async (req, res) => {
  if (req.session._id) {
    if (req.session._id === "5e63adda4f8fb2266eb514eb") {
      return res.redirect("/admin");
    }
    return res.render("mappage.html");
  }
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const result = await User.find({
    mobile: req.body.mobile
  });
  if (result[0]) return res.status(200).send(result[0]);
  else return res.status(400).send({ status: false });
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
});

router.get("/wallet", async (req, res) => {
  console.log(req.session._id);
  if (req.session._id) {
    if (req.session._id === "5e63adda4f8fb2266eb514eb") {
      return res.redirect("/admin");
    }
    const result = await User.findById(req.session._id);
    console.log(result);
    // return res.send("ok");
    return res.render("wallet.html", {
      username: result.name,
      balance: result.balance
    });
  }
  return res.redirect("/");
});

router.post("/wallet", (req, res) => {
  // const result = await U
  console.log("ok");
});

router.get("/locations", async (req, res) => {
  const result = await Location.find().sort("-time");
  console.log(result);
  res.render("locations.html", { locations: result });
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

router.get("/", (req, res) => {
  if (req.session._id) {
    if (req.session._id === "5e63adda4f8fb2266eb514eb") {
      return res.redirect("/admin");
    }
    return res.redirect("/mappage");
  }
  return res.render("home.html");
});

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      return res.negotiate(err);
    }
    return res.redirect("/");
  });
});

module.exports = router;
