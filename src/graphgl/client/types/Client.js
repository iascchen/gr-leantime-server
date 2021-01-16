import {gql} from 'apollo-server-express'

export default gql`
    type Client {
        _id: String!
        
        tenantId: String!
        name: String!
        desc: String
        
        members: [OrgRole]

        status: Int
    }

    extend type Query {
        client(id: ID!): Client!
        clients(limit: Int, skip: Int, id: String, keywords: String): [Client!]!
    }

    extend type Mutation {
        createClient(Client: CreateClientInput!): Client!
        updateClient(id: String!, Client: UpdateClientInput!): Client!
        deleteClient(id: String!): Client!
    }

    input CreateClientInput {
        tenantId: String!
        name: String!
        desc: String
    }
  
    input UpdateClientInput {
        name: String
        desc: String
        
        members: [OrgRoleInput]
        
        status: Int
    }
`
