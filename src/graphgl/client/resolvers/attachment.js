import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        attachment: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { attachmentModel } }, ) => {
                const entity = await attachmentModel.findById({ _id: id }).exec()
                return entity
            }),
        attachments: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { attachmentModel } }, ) => {
                if(id){
                    const ret = await attachmentModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await attachmentModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createAttachment: combineResolvers(
            isAuthenticated,
            async (parent, { attachment }, { models: { attachmentModel } }, ) => {
                // console.log('createAttachment', attachment)
                const newEntity = await new attachmentModel(attachment)

                return new Promise((resolve, reject) => {
                    newEntity.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateAttachment: combineResolvers(
            isAuthenticated,
            async (parent, { id, attachment }, { models: { attachmentModel } }, ) => {
                // console.log('updateAttachment', id, attachment)
                return new Promise((resolve, reject) => {
                    attachmentModel.findByIdAndUpdate(id, { $set: { ...attachment } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteAttachment: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { attachmentModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    attachmentModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
