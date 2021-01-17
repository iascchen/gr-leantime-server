import {gql} from 'apollo-server-express'

export default gql`
    type Timesheet {
        _id: String!
        
        userId: String!
        ticketId: String!
        workDate: Date
        hours: Float
        desc: String
  
        type: String
        
        status: Int
    }

    extend type Query {
        timesheet(id: ID!): Timesheet!
        timesheets(limit: Int, skip: Int, id: String, keywords: String): [Timesheet!]!
    }

    extend type Mutation {
        createTimesheet(Timesheet: CreateTimesheetInput!): Timesheet!
        updateTimesheet(id: String!, Timesheet: UpdateTimesheetInput!): Timesheet!
        deleteTimesheet(id: String!): Timesheet!
    }

    input CreateTimesheetInput {
        userId: String!
        ticketId: String!
        workDate: Date
        hours: Float
    }
  
    input UpdateTimesheetInput {
        ticketId: String!
        workDate: Date
        hours: Float
        desc: String
  
        type: String
        
        status: Int
    }
`
