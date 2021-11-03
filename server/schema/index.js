const { gql } = require("apollo-server-core")

module.exports = gql`
  type User {
    _id: ID!
    username: String
    password: String
    userType: Int
    info: UserInfo
    createdAt: String
    updatedAt: String
  }

  type UserInfo {
    _id: ID!
    name: String
    avatar: String
    email: String
    phone: String
    identification: String
    account: User
    topics: [Topic]
    createdAt: String
    updatedAt: String
  }

  type Topic {
    _id: ID!
    title: String
    content: String
    enable: Boolean
    duyet: Int
    topicType: [String]
    creator: UserInfo
    createdAt: String
    updatedAt: String
  }

  type ScheduleEvent {
    _id: ID!
    title: String
    timeStart: String
    timeEnd: String
    hotStop: Boolean
    numberOfTopics: Int
    topics: [TopicsOfEvent]
    comfirm: [ComfirmSvTopicGv]
    createdAt: String
    updatedAt: String
  }

  type TopicsOfEvent {
    _id: ID!
    topic: Topic
    sinhvien: [UserInfo]
    event: ScheduleEvent
    createdAt: String
    updatedAt: String
  }

  type ComfirmSvTopicGv {
    _id: ID!
    topic: Topic
    sinhvien: UserInfo
    gianvien: UserInfo
    event: ScheduleEvent
    createdAt: String
    updatedAt: String
  }

  # Response type
  type UserInfoMutationResponse {
    code: Int!
    success: Boolean!
    message: String
    userInfo: UserInfo
    errors: [String]
  }

  type UserMutationResponse {
    code: Int!
    success: Boolean!
    message: String
    user: User
    errors: [String]
  }

  type TopicMutationResponse {
    code: Int!
    success: Boolean!
    message: String
    topic: Topic
    errors: [String]
  }

  type ScheduleEventMutationResponse {
    code: Int!
    success: Boolean!
    message: String
    scheduleEvent: ScheduleEvent
    errors: [String]
  }

  type ScheduleEventQueryResponse {
    code: Int!
    success: Boolean!
    active: Boolean
    message: String
    scheduleEvent: ScheduleEvent
    errors: [String]
  }

  type AllScheduleEventQueryResponse {
    code: Int!
    success: Boolean!
    message: String
    scheduleEvents: [ScheduleEvent]
    errors: [String]
  }

  type TopicsOfEventQueryResponse {
    code: Int!
    success: Boolean!
    message: String
    topicsOfEvent: [TopicsOfEvent]
    errors: [String]
  }

  type UserQueryResponse {
    code: Int!
    success: Boolean!
    message: String
    users: [User]
    errors: [String]
  }

  input ComfirmInput {
    topic: ID!
    sinhvien: ID!
    gianvien: ID!
  }

  type ComfirmSvTopicGvMutationResponse {
    code: Int!
    success: Boolean!
    message: String
    comfirmSvTopicGv: [ComfirmSvTopicGv]
  }

  type AuthResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
    token: String
    tokenExpiration: Int
  }

  # ROOT API
  type Query {
    hello: String
    login(username: String!, password: String!): AuthResponse
    userByTypeUser(userType: Int!): UserQueryResponse
    userInfoes: [UserInfo]
    userInfoById(id: ID!): UserInfo
    topics: [Topic]
    checkScheduleEvent: ScheduleEventQueryResponse
    getChartRegisterTopics(ScheduleEvent: ID!): TopicsOfEventQueryResponse
    scheduleEvents: AllScheduleEventQueryResponse
    scheduleEvent(ScheduleEvent: ID!): ScheduleEventQueryResponse
  }

  type Mutation {
    # Create API
    createUserInfo(
      name: String!
      avatar: String
      email: String!
      phone: String!
      identification: String
    ): UserInfoMutationResponse
    createUser(
      username: String!
      password: String!
      userType: Int!
      info: ID!
    ): UserMutationResponse
    createTopic(
      title: String!
      content: String!
      topicType: [String]
      creator: ID!
    ): TopicMutationResponse
    createScheduleEvent(
      title: String!
      timeStart: String!
      timeEnd: String!
      topics: [String!]!
      numberOfTopics: Int!
    ): ScheduleEventMutationResponse
    createComfirmSvTopicGv(
      scheduleEvent: ID!
      comfirmInput: [ComfirmInput!]!
    ): ComfirmSvTopicGvMutationResponse

    # Modify API
    updateTopic(
      _id: ID!
      title: String
      content: String
      topicType: [String]
      enable: Boolean
      duyet: Int
    ): TopicMutationResponse
    registerTopics(
      scheduleEvent: ID!
      sinhvien: ID!
      topics: [ID]!
    ): ScheduleEventMutationResponse

    # Delete API
    deleteTopic(_id: ID!): TopicMutationResponse
  }
`
