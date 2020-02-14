const mongoose = require("mongoose");
const appConstants = require("../config/appConstants");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  role: {
    type: Number,
    default: appConstants.USER_ROLE.ADMIN,
    enum: [appConstants.USER_ROLE.ADMIN, appConstants.USER_ROLE.USER]
  }
});
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
