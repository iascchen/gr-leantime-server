import {gql} from 'apollo-server-express'

export default gql`
    type Project {
        _id: String!
        
        name: String!
        tenantId: String!
        groupId: String
        slug: String!
        desc: String
        
        clientId: String!
        clientContact: Contact
        hourBudget: String
        dollarBudget: Int
        
        ownerId: String!
        members: [OrgRole]
        
        visible: Int
        status: Int
    }

    extend type Query {
        project(id: ID!): Project!
        projects(limit: Int, skip: Int, id: String, keywords: String): [Project!]!
    }

    extend type Mutation {
        createProject(Project: CreateProjectInput!): Project!
        updateProject(id: String!, Project: UpdateProjectInput!): Project!
        deleteProject(id: String!): Project!
    }

    input CreateProjectInput {
        name: String!
        tenantId: String!
        groupId: String
        slug: String!
        desc: String
        
        clientId: String!
        clientContact: ContactInput
        hourBudget: String
        dollarBudget: Int
        
        ownerId: String!
        
        visible: Int
    }
  
    input UpdateProjectInput {
        name: String
        groupId: String
        slug: String
        desc: String
        
        clientContact: ContactInput
        hourBudget: String
        dollarBudget: Int
        
        ownerId: String
        members: [OrgRoleInput]
        
        visible: Int
        status: Int
    }
`
