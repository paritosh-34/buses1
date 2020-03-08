const express = require("express");
const session = require("express-session");

const { Location } = require("../models/locations");
const { User } = require("../models/users");
const { Conductor } = require("../models/conductors");
const { Bus } = require("../models/buses");
const { Transaction } = require("../models/transactions");
const { Seats } = require("../models/seats");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session._id) {
    if (req.session._id === "5e63adda4f8fb2266eb514eb") {
      return res.redirect("/admin");
    }
    return res.redirect("/mappage");
  }
  return res.render("home.html");
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

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      return res.negotiate(err);
    }
    return res.redirect("/");
  });
});

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

router.get("/mappage", async (req, res) => {
  if (req.session._id) {
    if (req.session._id === "5e63adda4f8fb2266eb514eb") {
      return res.redirect("/admin");
    }
    const buses = await Bus.find();
    return res.render("mappage.html", { buses: buses });
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

router.post("/wallet", async (req, res) => {
  if (req.session._id) {
    const result = await User.findById(req.session._id);
    result.balance = parseInt(result.balance) + parseInt(req.body.money);
    const t = await result.save();
    return res.redirect("/wallet");
  }
});

router.post("/m/wallet/subtract", async (req, res) => {
  const result = await User.findById(req.body.id);
  result.balance = result.balance - req.body.balance;
  const re = await result.save();
  return res.send(re);
});

router.post("/m/wallet/add", async (req, res) => {
  const result = await User.findById(req.body.id);
  result.balance = result.balance + req.body.balance;
  const re = await result.save();
  return res.send(re);
});

router.get("/locations", async (req, res) => {
  const result = await Location.find().sort("-time");
  console.log(result);
  res.render("locations.html", { locations: result });
});

router.get("/map", (req, res) => {
  res.render("maps.html");
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

router.get("/seats/c", (req, res) => {
  res.render("busC.html");
});

router.get("/seats", async (req, res) => {
  const result = await Seats.find();
  return res.send(result);
})

module.exports = router;
