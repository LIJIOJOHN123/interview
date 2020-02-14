const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jws = require("jsonwebtoken");
const EnvVariable = require("../config/appConstants");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);
UserSchema.pre("save", async function(next) {
  //encrypt password
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // email small letter
  user.email = user.email.toLowerCase();
  next();
});

//generate token for authentication
UserSchema.methods.generateToken = async function() {
  const user = this;
  const token = jws.sign(
    { _id: user._id.toString() },
    EnvVariable.JWT_VARIABLE
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
//hide password and tokens array
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
