const express = require("express");
const { Location, validate } = require("../models/locations");

const router = express.Router();


router.get("/", async (req, res) => {
  const result = await Location.find();
  res.send(result);
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
