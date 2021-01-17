import {gql} from 'apollo-server-express'

export default gql`
    type Canvas {
        _id: String!
        
        title: String!
        projectId: String!
        authorId: String!
        type: String!
        canvasItemIds: [String]

        status: Int
    }

    extend type Query {
        canvas(id: ID!): Canvas!
        canvases(limit: Int, skip: Int, id: String, keywords: String): [Canvas!]!
    }

    extend type Mutation {
        createCanvas(Canvas: CreateCanvasInput!): Canvas!
        updateCanvas(id: String!, Canvas: UpdateCanvasInput!): Canvas!
        deleteCanvas(id: String!): Canvas!
    }

    input CreateCanvasInput {
        title: String!
        projectId: String!
        authorId: String!
        type: String!
    }
  
    input UpdateCanvasInput {
        title: String
        canvasItemIds: [String]
        
        status: Int
    }
`
