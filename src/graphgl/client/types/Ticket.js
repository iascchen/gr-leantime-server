import {gql} from 'apollo-server-express'

export default gql`
    type Ticket {
        _id: String!
    
        projectId: String!
        title: String!
        type: String!
        desc: String
        
        dependingIds: [String]
        state: String
        
        milestoneId: String
        milestoneSort: Int
        sprintId: String
        sprintSort: Int
        
        canvasId: String
        
        tags: [String]
        priority: Int
        color: String
        
        ownerId: String!
        assignToId : String
        
        planStart: Date
        planEnd: Date
        start: Date
        end: Date

        storyPoints: Int

        planHours: Int
        recordedHours: Float
        remainHour: Float
    
        status: Int
    }

    extend type Query {
        ticket(id: ID!): Ticket!
        tickets(limit: Int, skip: Int, id: String, keywords: String): [Ticket!]!
    }

    extend type Mutation {
        createTicket(Ticket: CreateTicketInput!): Ticket!
        updateTicket(id: String!, Ticket: UpdateTicketInput!): Ticket!
        deleteTicket(id: String!): Ticket!
    }

    input CreateTicketInput {
        projectId: String!
        title: String!
        type: String!
        desc: String
        
        dependingIds: [String]
        state: String
        
        milestoneId: String
        milestoneSort: Int
        sprintId: String
        sprintSort: Int
        
        canvasId: String
        
        tags: [String]
        priority: Int
        color: String
        
        ownerId: String!
        assignToId : String
        
        planStart: Date
        planEnd: Date
        start: Date
        end: Date

        storyPoints: Int

        planHours: Int
        recordedHours: Float
        remainHour: Float
    }
  
    input UpdateTicketInput {
        title: String
        type: String
        desc: String
        
        dependingIds: [String]
        state: String
        
        milestoneId: String
        milestoneSort: Int
        sprintId: String
        sprintSort: Int
        
        canvasId: String
        
        tags: [String]
        priority: Int
        color: String
        
        ownerId: String!
        assignToId : String
        
        planStart: Date
        planEnd: Date
        start: Date
        end: Date

        storyPoints: Int

        planHours: Int
        recordedHours: Float
        remainHour: Float
    
        status: Int
    }
`
