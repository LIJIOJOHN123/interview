const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnvVarible = require("../config/appConstants");

const articleSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel"
    },
    link: {
      type: String,
      required: true
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      },
      { timestamps: true }
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "User"
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
      }
    ],
    articleDetails: [],
    visited: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    status: {
      type: Number,
      default: EnvVarible.ARTICLE_STATUS.ACTIVE,
      enum: [
        EnvVarible.ARTICLE_STATUS.ACTIVE,
        EnvVarible.ARTICLE_STATUS.VIOLATION_NOTIFIED,
        EnvVarible.ARTICLE_STATUS.VIOLATION_PENDING,
        EnvVarible.ARTICLE_STATUS.BLOCKED
      ]
    },
    sponsor: {
      type: Number,
      default: EnvVarible.ARTICLE_SPONSOR.NORMAL,
      enum: [
        EnvVarible.ARTICLE_SPONSOR.NORMAL,
        EnvVarible.ARTICLE_SPONSOR.REQUEST_PENDING,
        EnvVarible.ARTICLE_SPONSOR.SPONSORED
      ]
    }
  },
  { timestamps: true }
);
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
