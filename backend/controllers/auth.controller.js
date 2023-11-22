const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const saltRounds = 12;

router
  .post("/login", (req, res, next) => {
    const obj = req.body;
    if (!obj.email || !obj.password)
      return next(error({ status: 422, message: "All fields are required." }));
    User.findOne({ email: obj.email })
      .then(async (doc) => {
        if (!doc)
          return next(error({ status: 401, message: "Invalid credentials." }));
        try {
          const passwordMatch = await bcrypt.compare(
            obj.password,
            doc.password
          );
          if (passwordMatch) {
            const payload = {
              id: doc._id,
              name: doc.name,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            return res
              .cookie("access_token", token, {
                secure: req.secure,
                sameSite: 'None'
              })
              .json({ message: "User found." });
          } else
            return next(
              error({ status: 401, message: "Invalid credentials." })
            );
        } catch (err) {
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post("/register", (req, res, next) => {
    const obj = req.body;
    if (!obj.name || !obj.email || !obj.password)
      return next(error({ status: 422, message: "All fields are required." }));
    User.findOne({ email: obj.email })
      .then(async (doc) => {
        if (doc)
          return next(error({ status: 400, message: "User already exits." }));
        else {
          bcrypt.hash(obj.password, saltRounds, (err, hash) => {
            if (err) return next(err);
            else {
              obj.password = hash;
              User.create(obj)
                .then((doc) => res.status(201).send(doc))
                .catch((err) => next(err));
            }
          });
        }
      })
      .catch((err) => next(err));
  })
  .get("/logout", (req, res) => {
    res.clearCookie("access_token");
    return res.json({ message: "User logged out successfully." });
  })
  .get("/is_logged_in", (req, res) => {
    const token = req.cookies.access_token;
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.json({ isLoggedIn: false });
        return res.json({ isLoggedIn: true });
      });
    } else return res.json({ isLoggedIn: false });
  });

module.exports = router;
