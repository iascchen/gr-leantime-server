import {gql} from 'apollo-server-express'

export default gql`
    type Attachment {
        _id: String!
        
        module: String!
        moduleId: String!
        authorId: String!
        
        realName: String!
        encodeName: String
        extension: String
        
        tags: [String]
        
        status: Int
    }

    extend type Query {
        attachment(id: ID!): Attachment!
        attachments(limit: Int, skip: Int, id: String, keywords: String): [Attachment!]!
    }

    extend type Mutation {
        createAttachment(Attachment: CreateAttachmentInput!): Attachment!
        updateAttachment(id: String!, Attachment: UpdateAttachmentInput!): Attachment!
        deleteAttachment(id: String!): Attachment!
    }

    input CreateAttachmentInput {
        module: String!
        moduleId: String!
        authorId: String!
        realName: String!
        encodeName: String
        extension: String
    }
  
    input UpdateAttachmentInput {   
        realName: String
        tags: [String]
        status: Int
    }
`
