import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        canvasItem: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { canvasItemModel } }, ) => {
                const entity = await canvasItemModel.findById({ _id: id }).exec()
                return entity
            }),
        canvasItems: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { canvasItemModel } }, ) => {
                if(id){
                    const ret = await canvasItemModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await canvasItemModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createCanvasItem: combineResolvers(
            isAuthenticated,
            async (parent, { canvasItem }, { models: { canvasItemModel } }, ) => {
                // console.log('createCanvasItem', canvasItem)
                const newcanvasItem = await new canvasItemModel(canvasItem)

                return new Promise((resolve, reject) => {
                    newcanvasItem.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateCanvasItem: combineResolvers(
            isAuthenticated,
            async (parent, { id, canvasItem }, { models: { canvasItemModel } }, ) => {
                // console.log('updateCanvasItem', id, canvasItem)
                return new Promise((resolve, reject) => {
                    canvasItemModel.findByIdAndUpdate(id, { $set: { ...canvasItem } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteCanvasItem: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { canvasItemModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    canvasItemModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
