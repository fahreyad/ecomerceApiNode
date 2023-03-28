const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE,
  });
};

const compareJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const sendCookieonResponse = (res, user) => {
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
    httpOnly: true,
  });
};
module.exports = { createJWT, compareJWT, sendCookieonResponse };
