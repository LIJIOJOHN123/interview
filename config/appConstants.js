class EnvVariable {
  static DATABASE_ACCESS =
    "mongodb+srv://lijojohnrbs:100100100@cluster0-chrke.mongodb.net/test?retryWrites=true&w=majority";
  // "mongodb+srv://lijojohnrbs:100100100@shopping-ngsdx.mongodb.net/test?retryWrites=true&w=majority";
  // ";
  //   ||

  //user
  static JWT_VARIABLE = "thisFromWe8Share";
  static USER_ROLE = {
    USER: 0,
    SUPERADMIN: 1,
    ADMIN: 2,
    MARKETING: 3,
    WORKER: 4
  };
  static USER_STATUS = {
    ACTIVE: 1,
    BLOCKED: 2
  };
}
module.exports = EnvVariable;
