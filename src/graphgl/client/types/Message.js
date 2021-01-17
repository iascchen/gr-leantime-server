import {gql} from 'apollo-server-express'

export default gql`
    type Message {
        _id: String!
        
        fromId: String!
        toId: String!
        subject: String!
        content: String
        
        module: String
        moduleId: String
        
        read: Boolean
        status: Int
    }

    extend type Query {
        message(id: ID!): Message!
        messages(limit: Int, skip: Int, id: String, keywords: String): [Message!]!
    }

    extend type Mutation {
        createMessage(Message: CreateMessageInput!): Message!
        updateMessage(id: String!, Message: UpdateMessageInput!): Message!
        deleteMessage(id: String!): Message!
    }

    input CreateMessageInput {
        fromId: String!
        toId: String!
        subject: String!
        content: String
        
        module: String
        moduleId: String
    }
  
    input UpdateMessageInput {      
        read: Boolean
        status: Int
    }
`
