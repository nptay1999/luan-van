module.exports = {
  // QUERY
  Query: {
    hello: () => "Hello World",
    login: async (parent, args, { dataMethods }) =>
      await dataMethods.login(args),
    userByTypeUser: async (parent, { userType }, { dataMethods }) =>
      await dataMethods.getUserByTypeUser(userType),
    userInfoes: async (parent, args, { dataMethods }) =>
      await dataMethods.getAllUserInfo(),
    userInfoById: async (parent, { id }, { dataMethods }) =>
      await dataMethods.getUserInfoById(id),
    topics: async (parent, args, { dataMethods }) =>
      await dataMethods.getAllTopics(),
    checkScheduleEvent: async (parent, args, { dataMethods }) =>
      await dataMethods.checkScheduleEvent(),
    getChartRegisterTopics: async (
      parent,
      { ScheduleEvent },
      { dataMethods }
    ) =>
      await dataMethods.getTopicsOfEventByEventIdQueryResponse(ScheduleEvent),
    scheduleEvents: async (parent, args, { dataMethods }) =>
      await dataMethods.getAllScheduleEvents(),
    scheduleEvent: async (parent, { ScheduleEvent }, { dataMethods }) =>
      await dataMethods.queryScheduleEventById(ScheduleEvent),
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

  ScheduleEvent: {
    topics: async ({ _id }, args, { dataMethods }) =>
      await dataMethods.getTopicsOfEventByEventId(_id),
    comfirm: async ({ _id }, args, { dataMethods }) =>
      await dataMethods.getComfirmSvTopicGvByEventId(_id),
  },

  TopicsOfEvent: {
    topic: async ({ topic }, args, { dataMethods }) =>
      await dataMethods.getTopicById(topic),
    sinhvien: async ({ sinhvien }, args, { dataMethods }) => {
      return sinhvien.map(async (sv) => await dataMethods.getUserInfoById(sv))
    },
    event: async ({ event }, args, { dataMethods }) =>
      await dataMethods.getScheduleEventById(event),
  },

  ComfirmSvTopicGv: {
    topic: async ({ topic }, args, { dataMethods }) =>
      await dataMethods.getTopicById(topic),
    sinhvien: async ({ sinhvien }, args, { dataMethods }) =>
      await dataMethods.getUserInfoById(sinhvien),
    gianvien: async ({ gianvien }, args, { dataMethods }) =>
      await dataMethods.getUserInfoById(gianvien),
    event: async ({ event }, args, { dataMethods }) =>
      await dataMethods.getScheduleEventById(event),
  },

  // MUTATION
  Mutation: {
    createUserInfo: async (parent, args, { dataMethods }) =>
      await dataMethods.createUserInfo(args),
    createUser: async (parent, args, { dataMethods }) =>
      await dataMethods.createUser(args),
    createTopic: async (parent, args, { dataMethods }) =>
      await dataMethods.createTopic(args),
    createScheduleEvent: async (parent, args, { dataMethods }) =>
      await dataMethods.createScheduleEvent(args),
    createComfirmSvTopicGv: async (parent, args, { dataMethods }) =>
      await dataMethods.createComfirmSvTopicGv(args),

    updateTopic: async (parent, args, { dataMethods }) =>
      await dataMethods.updateTopic(args),
    registerTopics: async (parent, args, { dataMethods }) =>
      await dataMethods.registerTopics(args),

    deleteTopic: async (parent, args, { dataMethods }) =>
      await dataMethods.deleteTopic(args),
  },
}
