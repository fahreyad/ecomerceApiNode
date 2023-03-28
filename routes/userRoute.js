const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizedUser,
} = require("../middlewares/authenticateUser");
const userController = require("../controllers/userController");
router
  .route("/")
  .get(authenticateUser, authorizedUser("admin"), userController.getAllUser);

router.route("/update-user").patch(authenticateUser, userController.updateUser);
router
  .route("/update-password")
  .patch(authenticateUser, userController.changeUserPassword);
router.route("/profile").get(authenticateUser, userController.currentUser);
router.route("/:id").get(authenticateUser, userController.getSingleUser);

module.exports = router;
