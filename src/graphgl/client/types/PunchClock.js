import {gql} from 'apollo-server-express'

export default gql`
    type PunchClock {
        _id: String!
        userId: String!
        
        createdAt: Date
        updatedAt: Date
    }

    extend type Query {
        punchClock(userId: ID!): PunchClock!
    }

    extend type Mutation {
        createPunchClock(PunchClock: CreatePunchClockInput!): PunchClock!
        deletePunchClock(id: String!): PunchClock!
    }

    input CreatePunchClockInput {
        userId: String!
    }
`
