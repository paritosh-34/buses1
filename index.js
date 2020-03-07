const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");

const { Location, validate } = require("./models/locations");
const TestSocket = require("./models/test_sockets");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
// const logger = require("./middleware/logger");

mongoose
  .connect("mongodb+srv://paritosh:admin213@cluster0-gaca5.mongodb.net/buses1?retryWrites=true&w=majority", {
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

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(session({ secret: "ssshhhhh" }));
app.use(express.static("static"));

app.use(helmet());
app.use(morgan("dev"));

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("send_message", data => {
    socket.broadcast.emit("receive_message", data);
  });
  socket.on("post request", function(msg) {
    console.log("chat message", msg);
  });

  socket.on("test_socket", function(msg) {
    io.emit("locs", msg);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

app.post("/api/locations", async (req, res) => {
  console.log("ok body: ", req.body);
  console.log("type: ", typeof req.body);
  try {
    const { error } = validate(req.body);
    if (error) {
      console.log(typeof req.body);
      console.log(JSON.parse(req.body));
      return res.send(req.body);
    }

    io.broadcast.emit("post request", req.body);

    console.log(req.body.name);
    if (req.body.name) {
      let location = new Location({
        name: req.body.name,
        lat: req.body.lat,
        lon: req.body.lon
      });
      const result = await location.save();
      res.send(result);
    } else {
      let location = new Location({
        lat: req.body.lat,
        lon: req.body.lon
      });
      const result = await location.save();
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", users);
app.use("/api/conductors", conductors);
app.use("/api/buses", buses);
app.use("/api/transactions", transactions);
app.use("/api/locations", locations);
app.use("/", home);

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => console.log("Listening on port", port));
