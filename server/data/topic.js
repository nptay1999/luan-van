const UserInfo = require("../models/UserInfo");
const Topic = require("../models/Topic");

module.exports = {
  getAllTopics: async () => await Topic.find(),
  getTopics: async ({ creator }) => await Topic.find({ creator: creator }),
  createTopic: async (args) => {
    const { creator } = args;
    try {
      const userInfoCreator = await UserInfo.findById(creator);
      if (!userInfoCreator)
        return {
          code: 500,
          success: false,
          message: `UserInfo Not Found`,
        };

      const enable = false;
      const duyet = 0;
      const newTopic = new Topic({
        ...args,
        enable: enable,
        duyet: duyet,
      });
      const topic = await newTopic.save();
      return {
        code: 201,
        success: true,
        message: "Topic created successfully.",
        topic: topic,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
        error: [error.message],
      };
    }
  },
  updateTopic: async (args) => {
    const { _id, title, content, topicType, enable, duyet } = args;
    try {
      const topic = await Topic.findById(_id);
      if (title) topic.title = title;
      if (content) topic.content = content;
      if (enable !== undefined) topic.enable = enable;
      if (duyet) topic.duyet = duyet;

      if (topicType) topic.topicType = topicType;

      await topic.save();

      return {
        code: 201,
        success: true,
        message: `Update topic successfully.`,
        topic: topic,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
        error: [error.message],
      };
    }
  },
  deleteTopic: async ({ _id }) => {
    try {
      const result = await Topic.deleteOne({ _id: _id });
      if (result.deletedCount)
        return {
          code: 201,
          success: true,
          message: `Delete topic successfully.`,
        };
      else
        return {
          code: 500,
          success: false,
          message: `Delete topic unsuccessfully.`,
        };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
        error: [error.message],
      };
    }
  },
};
