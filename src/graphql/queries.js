import { gql } from '@apollo/client';

export const GET_USER=gql`
query getAllUsers {
  users {
    id
    name
    email
  }
}`;

export const GET_MSG=gql`
query MessagesByUser($receiverId: Int!) {
  messagesByUser(receiverId: $receiverId) {
    id
     text
    receiverId
    senderId
    createdAt
  }
}
`;