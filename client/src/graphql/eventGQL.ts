import { gql } from "@apollo/client"

export const CREATE_EVENT = gql`
  mutation Mutation(
    $title: String!
    $timeStart: String!
    $timeEnd: String!
    $topics: [String!]!
    $numberOfTopics: Int!
  ) {
    createScheduleEvent(
      title: $title
      timeStart: $timeStart
      timeEnd: $timeEnd
      topics: $topics
      numberOfTopics: $numberOfTopics
    ) {
      code
      success
      message
      scheduleEvent {
        _id
        title
        timeStart
        timeEnd
        hotStop
        numberOfTopics
        topics {
          _id
          topic {
            _id
            title
            creator {
              _id
              name
              email
              phone
            }
          }
        }
      }
    }
  }
`
