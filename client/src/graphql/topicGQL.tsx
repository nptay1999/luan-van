import { gql } from "@apollo/client"

export const GET_TOPICS = gql`
  query GET_TOPICS {
    topics {
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
        phone
        email
        identification
        account {
          _id
          username
          userType
        }
      }
      updatedAt
      createdAt
    }
  }
`

export const GET_A_TOPIC = gql`
  query QueryTopic($topicId: ID!) {
    topic(id: $topicId) {
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
        }
      }
    }
  }
`

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
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

export const UPDATE_CONTENT_TOPIC = gql`
  mutation UpdateTopicMutation(
    $id: ID!
    $updateTopicTitle2: String
    $updateTopicContent2: String
    $updateTopicTopicType2: [String]
  ) {
    updateTopic(
      _id: $id
      title: $updateTopicTitle2
      content: $updateTopicContent2
      topicType: $updateTopicTopicType2
    ) {
      code
      success
      message
      topic {
        _id
      }
    }
  }
`

export const DELETE_TOPIC = gql`
  mutation DeleteTopicMutation($deleteTopicId2: ID!) {
    deleteTopic(_id: $deleteTopicId2) {
      code
      success
      message
    }
  }
`
