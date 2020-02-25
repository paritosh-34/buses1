const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const locationSchema = mongoose.Schema({
  lat: Number,
  lon: Number
});

const Location = mongoose.model("locations", locationSchema);

router.get("/", async (req, res) => {
  const result = await Location.find();
  res.send(result);
});

let ll = new Location({
  lat: 30.5154156,
  lon: 76.6555297
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let location = new Location({
    lat: req.body.lat,
    lon: req.body.lon
  });

  const result = await location.save();
  res.send(result);
});

module.exports = router;
