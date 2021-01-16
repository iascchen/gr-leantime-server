import {gql} from 'apollo-server-express'

export default gql`
    type Group {
        _id: String!
        
        name: String!
        desc: String
        
        ownerId: String!
        members: [OrgRole]
        
        status: Int
    }

    extend type Query {
        group(id: ID!): Group!
        groups(limit: Int, skip: Int, id: String, keywords: String): [Group!]!
    }

    extend type Mutation {
        createGroup(Group: CreateGroupInput!): Group!
        updateGroup(id: String!, Group: UpdateGroupInput!): Group!
        deleteGroup(id: String!): Group!
    }

    input CreateGroupInput {
        name: String!
        desc: String
        
        ownerId: String!
    }
  
    input UpdateGroupInput {
        name: String
        desc: String
        
        ownerId: String
        members: [OrgRoleInput]
        
        status: Int
    }
`
