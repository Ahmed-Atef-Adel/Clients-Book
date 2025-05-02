const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/customerSchema");
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//-----------------------------------------------------

// Get request

app.get("/", (req, res) => {
  console.log("-------------------");
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { item: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { item: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

//-----------------------------------------------------

// Post request

app.post("/user/add.html", (req, res) => {
  User.create(req.body)
    .then(() => {
      console.log(req.body);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/search", (req, res) => {
  console.log("******************");
  console.log(req.body);
  const searchText = req.body.searchText.trim();
  User.find({
    $or: [
      { firstName: searchText },
      { lastName: searchText },
      // { age: searc hText },
      { country: searchText },
      { gender: searchText },
    ],
  })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

//-----------------------------------------------------

// Delete request

app.delete("/edit/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.delete("/edit/:id", (req, res) => {
//   User.findByIdAndDelete(req.params.id, req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//-----------------------------------------------------

//Put request:

app.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.put("/edit/:id", (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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
