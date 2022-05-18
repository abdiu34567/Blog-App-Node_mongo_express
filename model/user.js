const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: [true, "Please Provide UserName"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

UserSchema.plugin(uniqueValidator);

// export model
const User = mongoose.model("user", UserSchema);
module.exports = User;
