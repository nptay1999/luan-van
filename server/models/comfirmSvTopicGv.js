const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComfirmSvTopicGvSchema = new Schema(
  {
    topic: { type: String },
    sinhvien: { type: String },
    gianvien: { type: String },
    event: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comfirmSvTopicGv", ComfirmSvTopicGvSchema);
