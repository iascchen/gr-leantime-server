import {gql} from 'apollo-server-express'

export default gql`
    type Comment {
        _id: String!

        module: String!
        moduleId: String!
        authorId: String!
        
        commentParent: String
        text: String
        
        status: Int
    }

    extend type Query {
        comment(id: ID!): Comment!
        comments(limit: Int, skip: Int, id: String, keywords: String): [Comment!]!
    }

    extend type Mutation {
        createComment(Comment: CreateCommentInput!): Comment!
        updateComment(id: String!, Comment: UpdateCommentInput!): Comment!
        deleteComment(id: String!): Comment!
    }

    input CreateCommentInput {
        module: String!
        moduleId: String!
        authorId: String!
        
        commentParent: String
        text: String
    }
  
    input UpdateCommentInput {
        text: String
        
        status: Int
    }
`
