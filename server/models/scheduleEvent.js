const mongoose = require("mongoose")
const { Schema } = mongoose

const ScheduleEventSchema = new Schema(
  {
    title: { type: String },
    timeStart: { type: String },
    timeEnd: { type: String },
    hotStop: { type: Boolean },
    numberOfTopics: { type: Number },
  },
  { timestamps: true }
)

module.exports = mongoose.model("scheduleEvent", ScheduleEventSchema)
