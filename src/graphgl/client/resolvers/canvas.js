import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        canvas: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { canvasModel } }, ) => {
                const entity = await canvasModel.findById({ _id: id }).exec()
                return entity
            }),
        canvases: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { canvasModel } }, ) => {
                if(id){
                    const ret = await canvasModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await canvasModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createCanvas: combineResolvers(
            isAuthenticated,
            async (parent, { canvas }, { models: { canvasModel } }, ) => {
                // console.log('createCanvas', canvas)
                const newCanvas = await new canvasModel(canvas)

                return new Promise((resolve, reject) => {
                    newCanvas.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateCanvas: combineResolvers(
            isAuthenticated,
            async (parent, { id, canvas }, { models: { canvasModel } }, ) => {
                // console.log('updateCanvas', id, canvas)
                return new Promise((resolve, reject) => {
                    canvasModel.findByIdAndUpdate(id, { $set: { ...canvas } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteCanvas: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { canvasModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    canvasModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
