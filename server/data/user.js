const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserInfo = require("../models/UserInfo");

module.exports = {
  getUser: async ({ info }) => {
    const user = await User.findOne({ info: info });
    if (user)
      return {
        ...user._doc,
        _id: user.id,
        password: null,
      };
    else return null;
  },
  getUserByTypeUser: async ({ userType }) => {
    try {
      const users = User.find({ userType: userType});
      return {
        code: 200,
        success: true,
        message: 'Query users successfully.',
        users: users
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Somethings wrong when query database!'
      }
    }
  },
  createUser: async (args) => {
    const { username, password, info } = args;

    try {
      const userInfo = await UserInfo.findById(info);
      if (!userInfo)
        return {
          code: 500,
          success: false,
          message: "UserInfo don's exist!",
        };

      const oldUser = await User.findOne({ username: username });
      if (oldUser)
        return {
          code: 500,
          success: false,
          message: "User existed!",
        };

      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ ...args, password: hashPassword });
      const user = await newUser.save();
      return {
        code: 201,
        success: true,
        message: "User created successfully.",
        user: user,
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
}