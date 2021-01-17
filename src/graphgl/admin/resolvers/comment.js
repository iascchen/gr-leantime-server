import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        comment: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { commentModel } }, ) => {
                const entity = await commentModel.findById({ _id: id }).exec()
                return entity
            }),
        comments: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { commentModel } }, ) => {
                if(id){
                    const ret = await commentModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await commentModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createComment: combineResolvers(
            isAuthenticated,
            async (parent, { comment }, { models: { commentModel } }, ) => {
                // console.log('createComment', comment)
                const newComment = await new commentModel(comment)

                return new Promise((resolve, reject) => {
                    newComment.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateComment: combineResolvers(
            isAuthenticated,
            async (parent, { id, comment }, { models: { commentModel } }, ) => {
                // console.log('updateComment', id, comment)
                return new Promise((resolve, reject) => {
                    commentModel.findByIdAndUpdate(id, { $set: { ...comment } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteComment: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { commentModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    commentModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
