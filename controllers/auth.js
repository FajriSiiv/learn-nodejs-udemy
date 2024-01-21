const User = require("../models/user");
const { ObjectID } = require("mongodb");

exports.getLogin = async (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
exports.postLogin = async (req, res, next) => {
  const userDetail = await User.findById("65aca370e0112b3060a8ae3f");
  console.log(userDetail);

  User.findById("65aca370e0112b3060a8ae3f")
    .then((user) => {
      const userModel = {
        cart: user.cart,
        _id: String(user._id),
        name: user.name,
        email: user.email,
        __v: user.__v,
      };

      req.session.isLoggedIn = true;
      req.session.user = userModel;

      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
