const User = require("../models/user.model");
const error = require("../utils/error");
const router = require("express").Router();
const brcrypt = require("bcryptjs");
const saltRounds = 12;

router
  .get("/", (req, res, next) => {
    User.findById(req.user.id)
      .select("name email")
      .then((doc) => res.json(doc))
      .catch((err) => next(err));
  })
  .put("/", (req, res, next) => {
    User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.username,
        // email: req.body.email,
      },
      {
        new: true,
      }
    )
      .select("name email")
      .then((doc) => res.json(doc))
      .catch((err) => next(err));
  });

module.exports = router;
