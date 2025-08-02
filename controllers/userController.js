const AuthUser = require("../models/authUser");
var moment = require("moment");
var jwt = require("jsonwebtoken");

const user_index_get = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      res.render("index", { arr: result.customerInfo, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_post = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  AuthUser.updateOne({ _id: decoded.id }, { $push: { customerInfo: req.body } })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  AuthUser.updateOne(
    { "customerInfo._id": req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
  AuthUser.findOne({
    "customerInfo._id": req.params.id,
  })
    .then((result) => {
      const customer = result.customerInfo.id(req.params.id);
      res.render("user/view", { item: customer, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  AuthUser.findOne({ 'customerInfo._id': req.params.id})
    .then((result) => {
      const customer = result.customerInfo.id(req.params.id)
      console.log('======================')
      console.log(customer)
      res.render("user/edit", { item: customer, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_put = (req, res) => {
  AuthUser.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  console.log("******************");
  console.log(req.body);
  const searchText = req.body.searchText.trim();
  AuthUser.find({
    $or: [
      { firstName: searchText },
      { lastName: searchText },
      { age: searchText },
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



const user_add_get = (req, res) => {
  res.render("user/add");
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};
