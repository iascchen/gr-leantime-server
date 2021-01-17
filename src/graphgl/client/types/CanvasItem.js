import {gql} from 'apollo-server-express'

export default gql`
    type CanvasItem {
        _id: String!
        
        canvasId: String!
        ownerId: String!
        
        title: String!
        assumption: String
        data: String
        conclusion: String
        
        box: String!
        state: String
        color: String

        milestoneId: String
    }

    extend type Query {
        canvasItem(id: ID!): CanvasItem!
        canvasItems(limit: Int, skip: Int, id: String, keywords: String): [CanvasItem!]!
    }

    extend type Mutation {
        createCanvasItem(CanvasItem: CreateCanvasItemInput!): CanvasItem!
        updateCanvasItem(id: String!, CanvasItem: UpdateCanvasItemInput!): CanvasItem!
        deleteCanvasItem(id: String!): CanvasItem!
    }

    input CreateCanvasItemInput {
        canvasId: String!
        ownerId: String!
        box: String!

        title: String!
        assumption: String
        data: String
        conclusion: String
        
        state: String
        color: String

        milestoneId: String
    }
  
    input UpdateCanvasItemInput {
        ownerId: String
        
        title: String
        assumption: String
        data: String
        conclusion: String

        state: String
        color: String

        milestoneId: String
    }
`
