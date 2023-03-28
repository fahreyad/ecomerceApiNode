const customErrors = require("../errors/");
const utils = require("../utils");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (!token) {
      throw new customErrors.Unauthenticate("user unauthenticate");
    } else {
      const { name, id, role } = utils.compareJWT(token);
      req.user = { name, id, role };
      next();
    }
  } catch (error) {
    throw new customErrors.Unauthenticate("user unauthenticate");
  }
};

const authorizedUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customErrors.Unauthorize("you are forbitten to use this route");
    }
    next();
  };
};
module.exports = { authenticateUser, authorizedUser };
