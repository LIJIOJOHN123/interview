const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnvVarible = require("../config/appConstants");

const sourceSchema = new Schema({
  source: {
    type: String
  },
  status: {
    type: Number,
    default: EnvVarible.SOURCE_STATUS.APPROVED,
    enum: [
      EnvVarible.SOURCE_STATUS.APPROVED,
      EnvVarible.SOURCE_STATUS.BLOCKED,
      EnvVarible.SOURCE_STATUS.SILVER,
      EnvVarible.SOURCE_STATUS.GOLD,
      EnvVarible.SOURCE_STATUS.DIAMOND
    ]
  }
});
const Source = mongoose.model("Source", sourceSchema);

module.exports = Source;
