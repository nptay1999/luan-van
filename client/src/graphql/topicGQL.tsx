import { gql } from "@apollo/client"

export const CREATE_TOPIC = gql`
  mutation Mutation(
    $title: String!
    $content: String!
    $creator: ID!
    $topicType: [String]
  ) {
    createTopic(
      title: $title
      content: $content
      creator: $creator
      topicType: $topicType
    ) {
      code
      success
      message
      topic {
        _id
        title
        content
        enable
        duyet
        topicType
        creator {
          _id
          name
          avatar
          email
          phone
          identification
          account {
            _id
            username
            userType
          }
        }
      }
    }
  }
`
