const express = require("express");
const { Location, validate } = require("../models/locations");

const router = express.Router();


router.get("/", async (req, res) => {
  const result = await Location.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  console.log("ok body: ", req.body);
  console.log("type: ", typeof(req.body));
  try {
    const { error } = validate(req.body);
    if (error) {
      console.log(typeof(req.body));
      console.log(JSON.parse(req.body));
      return res.send(req.body);
    }
    let location = new Location({
      lat: req.body.lat,
      lon: req.body.lon
    });
    
    const result = await location.save();
    res.send(result);
  }
  catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Location.findByIdAndRemove(req.params.id, {
      useFindAndModify: false
    });
    if (!result) return res.status(400).send("Invalid Id");
    res.send(result);
  } catch (err) {
    console.log("Error: ", err);
    res.send(err);
  }
});

module.exports = router;
