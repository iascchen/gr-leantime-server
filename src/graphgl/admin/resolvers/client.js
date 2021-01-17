import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        client: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { clientModel } },) => {
                const entity = await clientModel.findById({ _id: id }).exec()
                return entity
            }),
        clients: combineResolvers(
            isAuthenticated,
            async (parent, { limit, skip, id, keywords }, { models: { clientModel } },) => {
                if (id) {
                    const ret = await clientModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ name: { '$regex': keywords } }, { desc: { '$regex': keywords } },] }
                        : {}

                    return await clientModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createClient: combineResolvers(
            isAuthenticated,
            async (parent, { client }, { models: { clientModel } },) => {
                // console.log('createClient', client)
                const newClient = await new clientModel(client)

                return new Promise((resolve, reject) => {
                    newClient.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateClient: combineResolvers(
            isAuthenticated,
            async (parent, { id, client }, { models: { clientModel } },) => {
                // console.log('updateclient', id, client)
                return new Promise((resolve, reject) => {
                    clientModel.findByIdAndUpdate(id, { $set: { ...client } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteClient: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { clientModel } },) => {
                return new Promise((resolve, reject) => {
                    // findByIdAndRemove
                    clientModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
