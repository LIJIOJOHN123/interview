const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Role = require("../model/Role");
const appConstant = require("../config/appConstants");

exports.registartion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = new User(req.body);

    //validate email address
    let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let valid = emailRegex.test(req.body.email);
    if (!valid)
      return res.status(400).json({
        errors: [{ msg: "Please enter valid email address" }]
      });
    //check existing email address
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({
        errors: [{ msg: "Email is in use.Please user other email" }]
      });
    }

    //first letter and space after letter capital letter
    user.name = user.name
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    //   const role = new Role();
    const role = new Role({
      user: user._id,
      role: appConstant.USER_ROLE.ADMIN
    });

    await user.save();
    await role.save();
    //generate token
    const token = await user.generateToken();
    res.status(201).send({ user, token, role });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //find user
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        errors: [{ msg: "Please verify your email and password" }]
      });
    //password matching with database password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(400).json({
        errors: [{ msg: "Please verify your email and password" }]
      });
    //generate token
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
//get userinfor
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
