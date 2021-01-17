import {gql} from 'apollo-server-express'

export default gql`
    type RepeatRule {
        calendarId: String!
        interval: String!
        value: String!
    }
    
    input RepeatRuleInput {
        calendarId: String!
        interval: String!
        value: String!
    }
`
