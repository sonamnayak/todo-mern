const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: false, default: "all" },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
