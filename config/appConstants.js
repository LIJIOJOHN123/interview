class EnvVariable {
  static DATABASE_ACCESS =
    "mongodb+srv://lijojohnrbs:100100100@cluster0-owyls.mongodb.net/test?retryWrites=true&w=majority";

  //jwt value
  static JWT_VARIABLE = "indiaisone";

  //User role
  static USER_ROLE = {
    ADMIN: 1,
    USER: 2
  };
}
module.exports = EnvVariable;
