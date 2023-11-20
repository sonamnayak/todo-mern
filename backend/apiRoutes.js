const checkAuth = require("./utils/checkAuth");
const error = require("./utils/error");

const router = require("express").Router();

router.use(
  "/tasks",
  checkAuth,
  error,
  require("./controllers/tasks.controller")
);
router.use("/auth", require("./controllers/auth.controller"));
router.use(
  "/users",
  checkAuth,
  error,
  require("./controllers/users.controller")
);

module.exports = router;
