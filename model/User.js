const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jws = require("jsonwebtoken");
const EnvVariable = require("../config/appConstants");
const ip = require("ip");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    faceBookToken: {
      type: String
    },
    coverPhoto: {
      type: String,
      default:
        "https://scontent-bom1-1.xx.fbcdn.net/v/t31.0-0/p180x540/13914029_1113350895399836_5166047133689777028_o.jpg?_nc_cat=101&_nc_ohc=3CqJF_8KYn8AX_G1xmW&_nc_ht=scontent-bom1-1.xx&_nc_tp=1002&oh=6742ab7a382f1c94744dfd2eb14b1f1e&oe=5E9A88C5"
    },
    avatar: {
      type: String,
      default:
        "https://yt3.ggpht.com/a/AGF-l7-L1jJvOCpat-6U8PVblQ_cSowHb42QQubFSw=s48-c-k-c0xffffffff-no-rj-mo"
    },
    status: {
      type: Number,
      default: EnvVariable.USER_STATUS.ACTIVE,
      enum: [EnvVariable.USER_STATUS.ACTIVE, EnvVariable.USER_STATUS.BLOCKED]
    },
    roles: [
      {
        type: Number,
        default: EnvVariable.USER_ROLE.USER,
        enum: [
          EnvVariable.USER_ROLE.USER,
          EnvVariable.USER_ROLE.SUPERADMIN,
          EnvVariable.USER_ROLE.ADMIN,
          EnvVariable.USER_ROLE.MARKETING,
          EnvVariable.USER_ROLE.WORKER
        ]
      }
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true
        },
        ipAddress: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);
UserSchema.pre("save", async function(next) {
  //encrypt password
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // email small letter
  user.email = user.email.toLowerCase();
  next();
});

//generate token for authentication
UserSchema.methods.generateToken = async function() {
  const user = this;
  const token = jws.sign(
    { _id: user._id.toString() },
    EnvVariable.JWT_VARIABLE
  );
  user.tokens.ipAddress = await ip.address();
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
//hide password and tokens array
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
