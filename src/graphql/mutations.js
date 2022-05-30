import { gql } from '@apollo/client';

export const SIGNUP_USER=gql`mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      id
      name
      email
     
    }
  }`;

export const LOGIN_USER=gql`mutation($userSignin: UserSigninInput!){
 
  signinUser(userSignin: $userSignin) {
    token
  }
}`;

export const CREATE_MSG=gql`
mutation CreateMessage($receiverId: Int!, $text: String!) {
  createMessage(receiverId: $receiverId, text: $text) {
    id
    text
    receiverId
    senderId
    createdAt
  }
}
`;