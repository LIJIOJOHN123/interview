const mongoose = requier("mongoose");
const Schema = mongoose.Schema;
const replySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  },
  reply: {
    type: String
  },
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
    }
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
  status: {
    type: Number,
    default: EnvVarible.CHANNEL_STATUS.ACTIVE,
    enum: [EnvVarible.CHANNEL_STATUS.ACTIVE, EnvVarible.CHANNEL_STATUS.BLOCKED]
  }
});
const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
