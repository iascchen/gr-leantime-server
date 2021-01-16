import {gql} from 'apollo-server-express'

export default gql`
    type SysRole {
        roleName: String!
        desc: String
    }

    extend type Query {
        sysRole(roleName: String!): SysRole!
        sysRoles(limit: Int, skip: Int, roleName: String, keywords: String): [SysRole!]!
    }

    extend type Mutation {
        createSysRole(SysRole: CreateSysRoleInput!): SysRole!
        updateSysRole(roleName: String!, SysRole: UpdateSysRoleInput!): SysRole!
        deleteSysRole(roleName: String!): SysRole!
    }

    input CreateSysRoleInput {
        roleName: String!
        desc: String
    }
  
    input UpdateSysRoleInput {
        desc: String
    }
`
