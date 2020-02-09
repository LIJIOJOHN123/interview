const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String
    },
    avatar: {
      type: String
    },
    coverPhoto: {
      type: String,
      default:
        "https://img-mm.manoramaonline.com/content/dam/mm/mo/news/just-in/images/2020/1/16/kochi-girl-murder.jpg"
    },
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    mobile: {
      type: String
    },
    userName: {
      type: String,
      unique: true
    },

    webste: { type: String },
    firstLanguage: { type: String },
    secondaryLanguage: { type: String },
    place: {
      type: String
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
