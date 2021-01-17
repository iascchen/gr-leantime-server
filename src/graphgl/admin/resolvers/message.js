import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        message: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { messageModel } }, ) => {
                const entity = await messageModel.findById({ _id: id }).exec()
                return entity
            }),
        messages: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { messageModel } }, ) => {
                if(id){
                    const ret = await messageModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await messageModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createMessage: combineResolvers(
            isAuthenticated,
            async (parent, { message }, { models: { messageModel } }, ) => {
                // console.log('createMessage', message)
                const newMessage = await new messageModel(message)

                return new Promise((resolve, reject) => {
                    newMessage.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateMessage: combineResolvers(
            isAuthenticated,
            async (parent, { id, message }, { models: { messageModel } }, ) => {
                // console.log('updateMessage', id, message)
                return new Promise((resolve, reject) => {
                    messageModel.findByIdAndUpdate(id, { $set: { ...message } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteMessage: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { messageModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    messageModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
