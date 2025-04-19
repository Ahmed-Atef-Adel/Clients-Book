const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/myDataSchema");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Mydata.find()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  res.render("home", { mytitle: "Home page" });
});

app.get("/index.html", (req, res) => {
  res.send("<h1> Data saved successfull </h1>");
});

mongoose
  .connect(
    "mongodb+srv://ahmedatef8885:Password12345@cluster0.n8myt.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  console.log(req.body);

  const mydata = new Mydata(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
