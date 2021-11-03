import { gql } from "@apollo/client"

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      code
      success
      message
      user {
        _id
        username
        userType
        info {
          _id
          name
          avatar
          email
          phone
          identification
        }
      }
      token
      tokenExpiration
    }
  }
`
