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

const users = require("./routes/users");
const conductors = require("./routes/conductors");
const buses = require("./routes/buses");
const transactions = require("./routes/transactions");
const locations = require("./routes/locations");
const home = require("./routes/home");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.static("static"));
app.use(helmet());
app.use(morgan("combined"));

app.use("/api/users", users);
app.use("/api/conductors", conductors);
app.use("/api/buses", buses);
app.use("/api/transactions", transactions);
app.use("/api/locations", locations);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log("Listening on port", port));
