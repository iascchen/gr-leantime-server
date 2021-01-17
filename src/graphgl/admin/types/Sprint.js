import {gql} from 'apollo-server-express'

export default gql`
    type Sprint {
        _id: String!

        projectId: String!
        name: String!
        start: Date!
        end: Date!
        
        planedSnapshot: [String]
        ticketIds: [String]
        retrospectiveId: String
        
        status: Int
    }

    extend type Query {
        sprint(id: ID!): Sprint!
        sprints(limit: Int, skip: Int, id: String, keywords: String): [Sprint!]!
    }

    extend type Mutation {
        createSprint(Sprint: CreateSprintInput!): Sprint!
        updateSprint(id: String!, Sprint: UpdateSprintInput!): Sprint!
        deleteSprint(id: String!): Sprint!
    }

    input CreateSprintInput {
        projectId: String!
        name: String!
        start: Date!
        end: Date!
    }
  
    input UpdateSprintInput {
        name: String
        start: Date
        end: Date
        
        planedSnapshot: [String]
        ticketIds: [String]
        
        retrospectiveId: String
        
        status: Int
    }
`
