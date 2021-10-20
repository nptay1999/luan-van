module.exports = {
  // QUERY
  Query: {
    hello: () => "Hello World",
    userInfoes: async (parent, args, { dataMethods }) =>
      await dataMethods.getAllUserInfo(),
    topics: async (parent, args, { dataMethods }) =>
      await dataMethods.getAllTopics(),
  },

  UserInfo: {
    account: async ({ _id }, args, { dataMethods }) =>
      await dataMethods.getUser({ info: _id }),
    topics: async ({ _id }, args, { dataMethods }) =>
      await dataMethods.getTopics({ creator: _id }),
  },

  User: {
    password: () => null,
    info: async ({ info }, args, { dataMethods }) =>
      await dataMethods.getUserInfoById(info),
  },

  Topic: {
    creator: async ({ creator }, args, { dataMethods }) =>
      await dataMethods.getUserInfoById(creator),
  },
  // MUTATION
  Mutation: {
    createUserInfo: async (parent, args, { dataMethods }) =>
      await dataMethods.createUserInfo(args),
    createUser: async (parent, args, { dataMethods }) =>
      await dataMethods.createUser(args),
    createTopic: async (parent, args, { dataMethods }) =>
      await dataMethods.createTopic(args),

    updateTopic: async (parent, args, { dataMethods }) =>
      await dataMethods.updateTopic(args),

    deleteTopic: async (parent, args, { dataMethods }) =>
      await dataMethods.deleteTopic(args),
  },
};
