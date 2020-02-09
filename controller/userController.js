const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const appConstants = require("../config/appConstants");

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
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({
        errors: [{ msg: "Email is in use.Please user other email" }]
      });
    }
    user.roles.push(appConstants.USER_ROLE.USER);
    randomNumber = Math.floor(Math.random() * (20000 * 30000));
    user.userName =
      req.body.name
        .toLowerCase()
        .trim()
        .replace(/\s/g, "") + randomNumber;
    user.name = user.name
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    await user.save();
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "Sorrry! We cound not process request. Please try once again"
        }
      ]
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        errors: [{ msg: "Please verify your email and password" }]
      });
    user.roles = user.roles.map(role => role === appConstants.USER_ROLE.USER);
    if (user.status === appConstants.USER_STATUS.BLOCKED) {
      return res.status(400).json({
        errors: [
          {
            msg:
              "You account has been blocked due to suspecious activity. Please contact our team for further infomation."
          }
        ]
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(400).json({
        errors: [{ msg: "Please verify your email and password" }]
      });
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
//update user
exports.updateUserInfo = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "mobile", "userName"];
  const userName = await User.findOne({ userName: req.body.userName });
  if (userName) {
    if (userName.userName === req.body.userName)
      return res.status(400).json({
        errors: [
          { msg: "Username already exists. Please choose another username." }
        ]
      });
  }

  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send("Invalid udpate");
  }

  try {
    updates.map(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.createAdmin = async (req, res) => {
  try {
    const userOne = await User.findOne({ email: req.body.email });
    if (!userOne) {
      const user = new User(req.body);

      //validate email address
      let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      let valid = emailRegex.test(req.body.email);
      if (!valid)
        return res.status(400).json({
          errors: [{ msg: "Please enter valid email address" }]
        });
      const email = await User.findOne({ email: req.body.email });
      if (email) {
        return res.status(400).json({
          errors: [{ msg: "Email is in use.Please user other email" }]
        });
      }
      user.roles.push(appConstants.USER_ROLE.ADMIN);
      randomNumber = Math.floor(Math.random() * (20000 * 30000));
      user.userName =
        req.body.name
          .toLowerCase()
          .trim()
          .replace(/\s/g, "") + randomNumber;
      user.name = user.name
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      await user.save();
      const token = await user.generateToken();
      res.status(201).send({ user, token });
    } else {
      const token = await userOne.generateToken();
      userOne.roles.push(appConstants.USER_ROLE.ADMIN);
      await userOne.save();
      res.send({ userOne, token });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.blockUser = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.user._id });
    admin.roles.map(role => role === appConstants.USER_ROLE.ADMIN);
    const user = await User.findOne({ _id: req.params.id });
    user.status = appConstants.USER_STATUS.BLOCKED;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};
exports.unblockUser = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.user._id });
    admin.roles.map(role => role === appConstants.USER_ROLE.ADMIN);
    const user = await User.findOne({ _id: req.params.id });
    user.status = appConstants.USER_STATUS.ACTIVE;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};
