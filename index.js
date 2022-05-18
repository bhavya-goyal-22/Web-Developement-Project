const express = require("express");
const path = require("path");

const app = express();

const { create } = require("express-handlebars");
require("./db");
const User = require("./Schema.js");

const bodyParser = require("body-parser");
const data = require("./data.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", ".hbs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    data: data,
  });
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email } = req.body;
    const user = new User({
      name,
      email,
    });
    await user.save();
    console.log("User Registered");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getcards");
const port = 3000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
