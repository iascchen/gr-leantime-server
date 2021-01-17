import {gql} from 'apollo-server-express'

export default gql`
    type SysModuleRight {
        _id: String!

        module: String!
        roles: [String]!
    }

    extend type Query {
        sysModuleRight(id: ID!): SysModuleRight!
        sysModuleRights(limit: Int, skip: Int, id: String, keywords: String): [SysModuleRight!]!
    }

    extend type Mutation {
        createSysModuleRight(SysModuleRight: CreateSysModuleRightInput!): SysModuleRight!
        updateSysModuleRight(id: String!, SysModuleRight: UpdateSysModuleRightInput!): SysModuleRight!
        deleteSysModuleRight(id: String!): SysModuleRight!
    }

    input CreateSysModuleRightInput {
        module: String!
        roles: [String]!
    }
  
    input UpdateSysModuleRightInput {
        roles: [String]!
    }
`
