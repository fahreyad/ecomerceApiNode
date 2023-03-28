const customErrors = require("../errors");
const checkPermission = (reqUserId, user) => {
  const { id, role } = user;
  if (role === "admin") return;
  if (reqUserId !== id) {
    throw new customErrors.Unauthorize(
      "user is not authorize to use this route"
    );
  }
};
module.exports = checkPermission;
