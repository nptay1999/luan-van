const TopicsOfEvent = require("../models/topicsOfEvent");
const ScheduleEvent = require("../models/scheduleEvent");

module.exports = {
  getTopicsOfEventByEventId: async (eventId) => {
    return await TopicsOfEvent.find({ event: eventId });
  },
  registerTopics: async (args) => {
    const { scheduleEvent, sinhvien, topics } = args;
    try {
      for (let topic of topics) {
        const topicOfEvent = await TopicsOfEvent.findOne({ topic: topic, event: scheduleEvent });
        topicOfEvent.sinhvien.push(sinhvien);
        await topicOfEvent.save();
      }
      return await ScheduleEvent.findById(scheduleEvent);
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Something wrong when working with database!'
      }
    }
  }
};
