const TopicLogic = require('./topic');
const UserInfoLogic = require('./userInfo');
const UserLogic = require('./user');
const ScheduleEvent = require('./scheduleEvent');
const TopicsOfEvent = require('./topicsOfEvent');
const ComfirmSvTopicGv = require('./comfirmSvTopicGv');

module.exports = {
  ...TopicLogic,
  ...UserInfoLogic,
  ...UserLogic,
  ...ScheduleEvent,
  ...TopicsOfEvent,
  ...ComfirmSvTopicGv
};
