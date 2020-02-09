const mongoose = require("mongoose");
const EnvVaraible = require("./appConstants");

const url = EnvVaraible.DATABASE_ACCESS;
if (!url) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});
