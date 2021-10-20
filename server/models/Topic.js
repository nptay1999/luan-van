const mongoose = require("mongoose");
const { Schema } = mongoose;

const TopicSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    enable: { type: Boolean },
    duyet: { type: Number },
    topicType: [String],
    creator: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("topics", TopicSchema);
