const { check } = require("express-validator");

exports.registerMiddlware = [
  check("name", "Name required")
    .not()
    .isEmpty(),
  check("email", "Email required")
    .not()
    .isEmpty(),
  check("password", "Password required")
    .not()
    .isEmpty(),
  check("name", "Name should contain minimum 4 charactor").isLength({ min: 4 }),

  check("password", "Password should contain minimum 6 charactor").isLength({
    min: 6
  })
];

exports.loginMiddlware = [
  check("email", "Email required")
    .not()
    .isEmpty(),
  check("password", "Password required")
    .not()
    .isEmpty()
];
