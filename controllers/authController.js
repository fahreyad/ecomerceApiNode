const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { sendCookieonResponse, creatTokenUser } = require("../utils");
const customError = require("../errors");
const bcrypt = require("bcryptjs");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError.BadRequest("email or passwrd required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError.BadRequest("user not found");
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new customError.Unauthenticate("user unauthorize");
  }
  const payload = creatTokenUser(user);

  sendCookieonResponse(res, payload);
  res.status(StatusCodes.OK).json({ user: payload });
};
const register = async (req, res) => {
  const user = await User.create(req.body);
  // const token = createJWT({
  //   id: user._id,
  //   name: user.name,
  //   role: user.role,
  // });
  const payload = creatTokenUser(user);

  sendCookieonResponse(res, payload);
  res.status(StatusCodes.CREATED).json({ user: payload });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
