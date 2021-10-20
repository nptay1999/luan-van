const TopicsOfEvent = require("../models/topicsOfEvent");
const ScheduleEvent = require("../models/scheduleEvent");

module.exports = {
  getTopicsOfEventByEventIdQueryResponse: async eventId => {
    try {
      const topicsOfEvent = await TopicsOfEvent.find({ event: eventId }); // []
      return {
        code: 200,
        success: true,
        message: 'Query topics of event successfully',
        topicsOfEvent: topicsOfEvent
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Something wrong when working with database!'
      }
    }
  },
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
      console.log('here', scheduleEvent);
      const event = await ScheduleEvent.findById(scheduleEvent);
      return {
        code: 201,
        success: true,
        message: 'Register topics successfully.',
        scheduleEvent: event
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Something wrong when working with database!'
      }
    }
  }
};
