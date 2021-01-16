import {gql} from 'apollo-server-express'

export default gql`
    type User {
        _id: String!
        
        username: String!
        role: String!
        displayName: String
        avatar: String
    
        contact: Contact
    
        lastLogin: Date
        lastLoginFrom: String
        session: String
        sessionTime: Int
    
        expires: Date
        notifications: Boolean
        
        status: Int
    }

    extend type Query {
        user(id: ID!): User!
        users(limit: Int, skip: Int, id: String, keywords: String): [User!]!
    }

    extend type Mutation {
        createUser(User: CreateUserInput!): User!
        updateUser(id: String!, User: UpdateUserInput!): User!
        deleteUser(id: String!): User!
    }

    input CreateUserInput {
        username: String!
        role: String
        displayName: String
        avatar: String
        
        contact: ContactInput
    
        notifications: Boolean
    }
  
    input UpdateUserInput {
        role: String
        displayName: String
        avatar: String
    
        contact: ContactInput
    
        lastLogin: Date
        lastLoginFrom: String
        session: String
        sessionTime: Int
    
        expires: Date
        notifications: Boolean
        
        status: Int
    }
`
