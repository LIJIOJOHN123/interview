const mongoose = require("mongoose");
const EnvVarible = require("../config/appConstants");
const Schema = mongoose.Schema;

const channelSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    channel: {
      type: String,
      required: true
    },
    channelName: {
      type: String,
      required: true,
      unique: true
    },
    introduction: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    keywords: {
      type: []
    },
    avatar: {
      type: String,
      default:
        "https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/p160x160/12360415_948901455178115_3240148525901529269_n.jpg?_nc_cat=106&_nc_ohc=wszhTAJjRfoAQkhvWDfDnaIn4jusMOOkek82yCmktrVZIA6bvsm3t-JpQ&_nc_ht=scontent-bom1-1.xx&_nc_tp=1&oh=7ac0c8c177f59906ca5c6c65449e1cf9&oe=5E9A9972"
    },
    converPhoto: {
      type: String,
      default:
        "https://img-mm.manoramaonline.com/content/dam/mm/mo/news/just-in/images/2019/12/29/allpartymeeting.jpg"
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "Article"
      },
      { timestamps: true }
    ],
    violation: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          Ref: "User"
        },
        reason: {
          type: String
        }
      },
      { timestamps: true }
    ],
    visited: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      },
      { timestamps: true }
    ],
    follows: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        channel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Channel"
        }
      },
      { timestamps: true }
    ],
    home: {
      type: Number,
      default: EnvVarible.CHANNEL_HOME_PAGE.COMMON,
      enum: [
        EnvVarible.CHANNEL_HOME_PAGE.COMMON,
        EnvVarible.CHANNEL_HOME_PAGE.APPROVED
      ]
    },
    sponsor: {
      type: Number,
      default: EnvVarible.CHANNEL_SPONSOR.NORMAL,
      enum: [
        EnvVarible.CHANNEL_SPONSOR.NORMAL,
        EnvVarible.CHANNEL_SPONSOR.REQUEST_PENDING,
        EnvVarible.CHANNEL_SPONSOR.SPONSORED
      ]
    },
    status: {
      type: Number,
      default: EnvVarible.CHANNEL_STATUS.ACTIVE,
      enum: [
        EnvVarible.CHANNEL_STATUS.ACTIVE,
        EnvVarible.CHANNEL_STATUS.BLOCKED
      ]
    },
    grade: {
      type: Number,
      default: EnvVarible.CHANNEL_GRADE.NORMAL,
      enum: [
        EnvVarible.CHANNEL_GRADE.NORMAL,
        EnvVarible.CHANNEL_GRADE.SILVER,
        EnvVarible.CHANNEL_GRADE.GOLD,
        EnvVarible.CHANNEL_GRADE.DIAMOND
      ]
    }
  },
  { timestamps: true }
);
const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
