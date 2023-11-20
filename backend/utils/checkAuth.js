const jwt = require("jsonwebtoken");
const error = require("./error");

const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(error({ status: 401, message: "Unauthorised." }));
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(error({ status: 401, message: "Invalid token." }));
    else {
      req.user = decoded;
      return next();
    }
  });
};

module.exports = checkAuth;
