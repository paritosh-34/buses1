const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

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
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'));

app.use("/api/users", users);
app.use("/api/conductors", conductors);
app.use("/api/buses", buses);
app.use("/api/transactions", transactions);
app.use("/api/locations", locations);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
