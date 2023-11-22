const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use("/api", require("./apiRoutes"));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error.";
  return res.status(status).json({ error: message, stack: err.stack });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server up and running on http://localhost:${port}`);
});
