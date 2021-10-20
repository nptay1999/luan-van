const UserInfo = require("../models/UserInfo");

module.exports = {
  getAllUserInfo: async () => await UserInfo.find(),
  getUserInfoById: async (id) => await UserInfo.findById(id),
  createUserInfo: async (args) => {
    try {
      const userInfo = new UserInfo(args);
      await userInfo.save();
      return {
        code: 201,
        success: true,
        message: "UserInfo created successfully.",
        userInfo: userInfo,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
        errors: [error.message],
      };
    }
  },
}