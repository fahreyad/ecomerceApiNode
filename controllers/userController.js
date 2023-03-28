const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customErrors = require("../errors");
const { findOneAndUpdate } = require("../models/User");
const {
  creatTokenUser,
  sendCookieonResponse,
  checkPermission,
} = require("../utils");
const getAllUser = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({
    success: "success",
    data: users,
  });
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  checkPermission(id, req.user);
  const user = await User.findById({ _id: id }).select("-password");
  res.status(StatusCodes.OK).json({
    success: "success",
    data: user,
  });
};
const currentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    success: "success",
    data: req.user,
  });
};
const changeUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new customErrors.BadRequest(
      "oldpassword and newpassword is required"
    );
  }
  const user = await User.findById({ _id: req.user.id });
  const comparePassword = await user.comparePassword(oldPassword);
  if (!comparePassword) {
    throw new customErrors.BadRequest("password not match");
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({
    success: "success",
    msg: "user password update successfully",
  });
};
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  );
  const tokenUser = creatTokenUser(user);
  sendCookieonResponse(res, tokenUser);
  res.status(StatusCodes.OK).json({
    success: "success",
    data: tokenUser,
  });
};

module.exports = {
  getAllUser,
  getSingleUser,
  currentUser,
  changeUserPassword,
  updateUser,
};
