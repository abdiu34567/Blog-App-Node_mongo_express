const Bcrypt = require("bcrypt");
const User = require("../model/user");
module.exports = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      Bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match
          // store user session, will talk about it later
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};
