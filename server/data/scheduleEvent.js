const ScheduleEvent = require("../models/scheduleEvent")
const TopicsOfEvent = require("../models/topicsOfEvent")

module.exports = {
  getScheduleEventById: async (_id) => await ScheduleEvent.findById(_id),
  getAllScheduleEvents: async () => {
    try {
      const events = await ScheduleEvent.find()
      return {
        code: 200,
        success: true,
        message: "Query event successfully.",
        scheduleEvents: events,
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: "Something wrong when working with database!",
      }
    }
  },
  queryScheduleEventById: async (_id) => {
    try {
      const event = await ScheduleEvent.findById(_id)
      return {
        code: 200,
        success: true,
        message: "Query event successfully.",
        scheduleEvent: event,
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: "Something wrong when working with database!",
      }
    }
  },
  checkScheduleEvent: async () => {
    try {
      // b3 -> b7
      const scheduleEvents = await ScheduleEvent.find()
      const timeNow = new Date().getTime()
      const activeEvent = scheduleEvents.filter((event) => {
        const timeStart = new Date(event.timeStart).getTime()
        const timeEnd = new Date(event.timeEnd).getTime()
        const hotStop = event
        return timeNow < timeEnd && timeNow > timeStart && hotStop
      })

      if (!activeEvent)
        return {
          code: 500,
          success: true,
          active: false,
          message: "There isn't event running!",
        }
      const event = activeEvent[activeEvent.length - 1]
      return {
        code: 200,
        success: true,
        active: true,
        message: "Query event successfully!",
        scheduleEvent: event,
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        active: false,
        message: "Something wrong when working with database!",
      }
    }
  },
  createScheduleEvent: async ({
    title,
    timeStart,
    timeEnd,
    topics,
    numberOfTopics,
  }) => {
    try {
      const newTimeStart = new Date(timeStart).getTime()

      // xác nhận có sự kiện đang diễn ra hay không. b7 -> b11
      const scheduleEvents = await ScheduleEvent.find()
      if (scheduleEvents.length >= 1) {
        const eventIsRunning = scheduleEvents.filter((event) => {
          const oldTimeEnd = new Date(event.timeEnd).getTime() // timeEnd: { type: time.toISOString() }
          const { hotStop } = event
          return newTimeStart < oldTimeEnd && hotStop
        })

        if (eventIsRunning)
          return {
            code: 400,
            success: false,
            message: "There is old event running!",
          }
      }

      // b11 -> end
      const newScheduleEvent = new ScheduleEvent({
        title: title,
        timeStart: timeStart,
        timeEnd: timeEnd,
        hotStop: true,
        numberOfTopics: numberOfTopics,
      })
      const saveEvent = await newScheduleEvent.save()

      for (let topic of topics) {
        const newTopicOfEvent = new TopicsOfEvent({
          topic: topic,
          event: saveEvent.id,
        })
        await newTopicOfEvent.save()
      }

      return {
        code: 201,
        success: true,
        message: "Created ScheduleEvent successfully.",
        scheduleEvent: saveEvent,
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: "Something wrong when working with database!",
      }
    }
  },
}
