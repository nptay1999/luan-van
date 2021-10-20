const { gql } = require("apollo-server-core");

module.exports = gql`
  type User {
    _id: ID!
    username: String
    password: String
    userType: Int
    info: UserInfo
    createAt: String
    updateAt: String
  }

  type UserInfo {
    _id: ID!
    name: String
    avatar: String
    email: String
    phone: String
    account: User
    topics: [Topic]
    createAt: String
    updateAt: String
  }

  type Topic {
    _id: ID!
    title: String
    content: String
    enable: Boolean
    duyet: Int
    topicType: [String]
    creator: UserInfo
    createAt: String
    updateAt: String
  }

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

  # ROOT API
  type Query {
    hello: String
    userInfoes: [UserInfo]
    topics: [Topic]
  }
  
  type Mutation {
    # Create API
    createUserInfo(name: String!, avatar: String, email: String!, phone: String!): UserInfoMutationResponse
    createUser(username: String!, password: String!, userType: Int!, info: ID!): UserMutationResponse
    createTopic(title: String!, content: String!, topicType: [String], creator: ID!): TopicMutationResponse

    # Modify API
    updateTopic(_id: ID!, title: String, content: String, topicType: [String], enable: Boolean, duyet: Int): TopicMutationResponse

    # Delete API
    deleteTopic(_id: ID!): TopicMutationResponse
  }
`