const router = require("express").Router();
const Task = require("../models/task.model");

router
  .post("/", (req, res, next) => {
    Task.create({
      title: req.body.title,
      status: req.body.status,
      user: req.user.id,
    })
      .then((doc) => res.json(doc))
      .catch((err) => next(err));
  })
  .get("/all", (req, res, next) => {
    Task.find()
      .then((docs) => res.json(docs))
      .catch((err) => next(err));
  })
  .get("/", (req, res, next) => {
    Task.find({ user: req.user.id })
      .then((docs) => res.json(docs))
      .catch((err) => next(err));
  })
  .put("/:id", (req, res, next) => {
    Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        status: req.body.status,
      },
      {
        new: true,
      }
    )
      .then((doc) => res.json(doc))
      .catch((err) => next(err));
  })
  .delete("/:id", (req, res, next) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: "Task deleted successfully." }))
      .catch((err) => next(err));
  });

module.exports = router;
