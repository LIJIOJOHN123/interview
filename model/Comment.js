const mongoose = require("mongoose");
const EnvVarible = require("../config/appConstants");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    },
    title: {
      type: String
    },
    comment: { type: String },
    avatar: {
      type: String
    },
    name: {
      type: String
    },
    userName: {
      type: String
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
    messageStatus: {
      type: String,
      default: EnvVarible.COMMENT_SHARE_STATUS.PUBLIC,
      enum: [
        EnvVarible.COMMENT_SHARE_STATUS.PUBLIC,
        EnvVarible.COMMENT_SHARE_STATUS.PRIVATE
      ]
    },
    status: {
      type: String,
      default: EnvVarible.COMMENT_STATUS.ACTIVE,
      enum: [
        EnvVarible.COMMENT_STATUS.ACTIVE,
        EnvVarible.COMMENT_STATUS.BLOCKED
      ]
    }
  },
  { timestamps: true }
);
const Commet = mongoose.model("Comment", CommentSchema);
module.exports = Commet;
