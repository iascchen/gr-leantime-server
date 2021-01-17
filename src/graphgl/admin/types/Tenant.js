import {gql} from 'apollo-server-express'

export default gql`
    type Tenant {
        _id: String!
        
        siteName: String!
        slug: String!
        desc: String

        language: String!
        timeZone: String!
    
        mainColor: String!
        logoPath: String

        ownerId: String!
        members: [OrgRole]
    
        status: Int
    }

    extend type Query {
        tenant(id: ID!): Tenant!
        tenants(limit: Int, skip: Int, id: String, keywords: String): [Tenant!]!
    }

    extend type Mutation {
        createTenant(Tenant: CreateTenantInput!): Tenant!
        updateTenant(id: String!, Tenant: UpdateTenantInput!): Tenant!
        deleteTenant(id: String!): Tenant!
    }

    input CreateTenantInput {
        siteName: String!
        slug: String!
        desc: String

        language: String!
        timeZone: String!
    
        mainColor: String!
        logoPath: String

        ownerId: String!
    }
  
    input UpdateTenantInput {
        siteName: String
        slug: String
        desc: String

        language: String
        timeZone: String
    
        mainColor: String
        logoPath: String

        ownerId: String
        members: [OrgRoleInput]
        
        status: Int
    }
`
