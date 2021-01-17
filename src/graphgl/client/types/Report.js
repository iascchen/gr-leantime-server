import {gql} from 'apollo-server-express'

export default gql`
    type Report {
        _id: String!
        
        authorId: String!
        start: Date!
        end: Date!
        
        subject: String!
        content: String
        
        planedSnapshot: [String]
        ticketIds: [String]
        
        status: Int
    }

    extend type Query {
        report(id: ID!): Report!
        reports(limit: Int, skip: Int, id: String, keywords: String): [Report!]!
    }

    extend type Mutation {
        createReport(Report: CreateReportInput!): Report!
        updateReport(id: String!, Report: UpdateReportInput!): Report!
        deleteReport(id: String!): Report!
    }

    input CreateReportInput {
        authorId: String!
        start: Date!
        end: Date!
        
        subject: String!
        content: String
        
        planedSnapshot: [String]
        ticketIds: [String]
    }
  
    input UpdateReportInput {        
        status: Int
    }
`
