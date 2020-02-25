const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

mongoose
  .connect("mongodb://localhost/buses1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Error:", err));

const users = require("./routes/users").router;
const conductors = require("./routes/conductors").router;
const buses = require("./routes/buses").router;
const transactions = require("./routes/transactions").router;
const locations = require("./routes/locations").router;
const home = require("./routes/home").router;
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(helmet());
app.use(morgan("tiny"));

app.use("/api/users", users);
app.use("/api/conductors", conductors);
app.use("/api/buses", buses);
app.use("/api/transactions", transactions);
app.use("/api/locations", locations);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
