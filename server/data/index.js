const TopicLogic = require('./topic');
const UserInfoLogic = require('./userInfo');
const UserLogic = require('./user');

module.exports = {
  ...TopicLogic,
  ...UserInfoLogic,
  ...UserLogic
};
