const ComfirmSvTopicGv = require('../models/comfirmSvTopicGv');

module.exports = {
  getComfirmSvTopicGvByEventId: async eventId => {
    return await ComfirmSvTopicGv.find({ event: eventId })
  },
  createComfirmSvTopicGv: async args => {
    const { scheduleEvent, comfirmInput } = args;
    try {
      for (let comfirm of comfirmInput) {
        const newComfirm = new ComfirmSvTopicGv({
          ...comfirm,
          event: scheduleEvent
        })
        await newComfirm.save()
      }
      const cfs = await ComfirmSvTopicGv.find({ event: scheduleEvent });
      return {
        code: 201,
        success: true,
        message: 'Save successfully',
        comfirmSvTopicGv: cfs
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Somethings wrong when creating comfirm!'
      }
    }
  }
}