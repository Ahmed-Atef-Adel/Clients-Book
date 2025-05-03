const User = require("../models/customerSchema");
var moment = require("moment");

const aaa = (req, res) => {
  console.log("-------------------");
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const bbb = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { item: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const ccc = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { item: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const eee = (req, res) => {
  User.create(req.body)
    .then(() => {
      console.log(req.body);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const fff = (req, res) => {
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
};

const ddd = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const mmm = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { aaa, bbb, ccc, eee, mmm, fff, ddd };
