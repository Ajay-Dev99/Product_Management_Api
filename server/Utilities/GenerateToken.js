const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, role) => {
  return jwt.sign({ id, role: role || "user" }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge,
  });
};

module.exports = {
  createToken,
};
