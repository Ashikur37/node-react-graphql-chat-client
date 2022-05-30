import { gql } from '@apollo/client';

export const MSG_SUB=gql`
subscription MessageAdded {
  messageAdded {
    text
    receiverId
    senderId
    id
    createdAt
  }
}`;