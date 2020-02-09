const jwt = require("jsonwebtoken");
const User = require("../model/User");
const EnvVariable = require("../config/appConstants");

const authMiddlware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, EnvVariable.JWT_VARIABLE);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please autheticate" });
  }
};
module.exports = authMiddlware;
