const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");
const jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");
const Task = require("./models/task.model");
const User = require("./models/user.model");
const auth = require("./auth");
require("dotenv").config();
const port = process.env.PORT || 5001;
const app = express();
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});
app.post("/register", (request, response) => {
  const { roll, password, role } = request.body;
  const user = new User({
    roll,
    password,
    role,
  });

  User.findOne({ roll })
    .then((u) => {
      if (!u) {
        user
          .save()
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      } else {
        response.status(409).send({
          message: "User with this roll already exists",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/login", (request, response) => {
  User.findOne({ roll: request.body.roll })

    .then((user) => {
      if (request.body.password != user.password) {
        return response.status(400).json({
          message: "Passwords does not match",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          userroll: user.roll,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      response.status(200).send({
        message: "Login Successful",
        roll: user.roll,
        token,
      });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.post("/tasks", auth, (request, response) => {
  const { userId } = request;
  const task = new Task({
    event_name: request.body.eventName,
    no_of_days: request.body.noOfDays,
    activity_duration: request.body.startDate,
    activity: request.body.serviceList,
    userId,
  });
  task
    .save()
    .then((result) => {
      response.status(201).send({
        message: "Task Created Successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error creating task",
        error,
      });
    });
});
app.get("/getquery", auth, (request, response) => {
  const { userId } = request;
  Task.find({ userId }).then((found) => response.json(found));
});

app.post("/getEvent", (req, res) => {
  const id = req.body.id;
  Task.find({ _id: mongoose.Types.ObjectId(id) })
    .then((tasks) =>
      res.json({
        tasks: [...tasks],
      })
    )
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getconsern", (request, response) => {
  Task.find().then((found) => response.json(found));
});
