const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = 5000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000",
  })
);

//ENDPOINTS

//URL: locahost:5000
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//URL: locahost:5000/login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

//URL: localhost:5000/register
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

mongoose
  .connect(
    "mongodb+srv://tanviyeole3:TanV%40314@cluster0.ng0h4af.mongodb.net/verifyme"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("failed to connected", e);
  });

//API ENDPOINTS
// localhost:5000/auth/register
app.post("/auth/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(400).json({ error: "Email Already Exists!!" });
    } else {
      const hashPass = await bcrypt.hash(password, 12);

      const userDetails = new User({
        firstName,
        lastName,
        email,
        password: hashPass,
      });

      await userDetails.save();

      res
        .status(200)
        .json({ message: "User registered successfully", user: userDetails });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Registration failed" });
  }
});

// localhost:5000/auth/login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);

      if (user && checkPass) {
        res.status(200).json({ message: "success" });
      } else if (!checkPass) {
        res.status(400).json({ error: "Incorrect Credentials" });
      }
    } else {
      res.status(404).json({ error: "User not Found" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

app.listen(port, () => {
  console.log(`Server Running on localhost:${port}`);
});
