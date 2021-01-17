import {gql} from 'apollo-server-express'

export default gql`
    type Calendar {
        _id: String!
        
        ownerId: String!
        invitedIds: [String],
        
        start: Date!
        end: Date!
        desc: String
        
        allDay: Boolean
        repeatRule: RepeatRule
        
        status: Int
    }

    extend type Query {
        calendar(id: ID!): Calendar!
        calendars(limit: Int, skip: Int, id: String, keywords: String): [Calendar!]!
    }

    extend type Mutation {
        createCalendar(Calendar: CreateCalendarInput!): Calendar!
        updateCalendar(id: String!, Calendar: UpdateCalendarInput!): Calendar!
        deleteCalendar(id: String!): Calendar!
    }

    input CreateCalendarInput {
        ownerId: String!
        invitedIds: [String],
        
        start: Date!
        end: Date!
        desc: String
        
        allDay: Boolean
        repeatRule: RepeatRuleInput
    }
  
    input UpdateCalendarInput {
        invitedIds: [String],
        
        start: Date
        end: Date
        desc: String
        
        allDay: Boolean
        repeatRule: RepeatRuleInput
        
        status: Int
    }
`
