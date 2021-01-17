import {gql} from 'apollo-server-express'

export default gql`
    type TicketHistory {
        _id: String!

        ticketId: String!
        editorId: String!
        changeOp: String
        changeValue: String
        createdAt: Date
    }

    extend type Query {
        ticketHistories(ticketId: String!, limit: Int, skip: Int, keywords: String): [TicketHistory!]!
    }

    extend type Mutation {
        createTicketHistory(TicketHistory: CreateTicketHistoryInput!): TicketHistory!
    }

    input CreateTicketHistoryInput {
        ticketId: String!
        editorId: String!
        changeOp: String
        changeValue: String
    }
`
