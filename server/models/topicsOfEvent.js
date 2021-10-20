const mongoose = require("mongoose");
const { Schema } = mongoose;

const TopicsOfEventSchema = new Schema(
  {
    topic: { type: String },
    sinhvien: [String],
    event: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("topicsOfEvent", TopicsOfEventSchema);
