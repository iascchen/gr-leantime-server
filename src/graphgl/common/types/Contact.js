import {gql} from 'apollo-server-express'

export default gql`
    type Contact {
        name: String!
        mobile: String!
        email: String
        phone: String
        internet: String
        wechat: String

        country: String!
        state: String!
        city: String!
        address: String
        zip: String
        
        tags: [String]

        status: Int
    }
    
    input ContactInput {
        name: String!
        mobile: String!
        email: String
        phone: String
        internet: String
        wechat: String

        country: String!
        state: String!
        city: String!
        address: String
        zip: String
        
        tags: [String]

        status: Int
    }
`
