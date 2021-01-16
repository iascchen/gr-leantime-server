import {gql} from 'apollo-server-express'

export default gql`
    type OrgRole {
        userId: String!
        role: String!

        status: Int!
    }
    
    input OrgRoleInput {
        userId: String!
        role: String!

        status: Int!
    }
`
