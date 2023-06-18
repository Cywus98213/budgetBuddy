if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/users");
const cronJobs = require("./utils/cronJobs");

const PORT = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/budgetbuddy";

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use("/", usersRoute);

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(ip); // The user's IP address

  // Perform IP geolocation to determine the user's approximate location
  // You can use third-party APIs or libraries to perform IP geolocation

  // Based on the location, determine the appropriate time zone and send it to the client
  const timeZone = "America/New_York"; // Example time zone
  res.send(timeZone);
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
