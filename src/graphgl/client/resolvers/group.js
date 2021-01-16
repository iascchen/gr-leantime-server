import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        group: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { groupModel } }, ) => {
                const entity = await groupModel.findById({ _id: id }).exec()
                return entity
            }),
        groups: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { groupModel } }, ) => {
                if(id){
                    const ret = await groupModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ name: { '$regex': keywords } }, { desc: { '$regex': keywords } },] }
                        : {}

                    return await groupModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createGroup: combineResolvers(
            isAuthenticated,
            async (parent, { group }, { models: { groupModel } }, ) => {
                // console.log('createGroup', group)
                const newGroup = await new groupModel(group)

                return new Promise((resolve, reject) => {
                    newGroup.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateGroup: combineResolvers(
            isAuthenticated,
            async (parent, { id, group }, { models: { groupModel } }, ) => {
                // console.log('updateGroup', id, group)
                return new Promise((resolve, reject) => {
                    groupModel.findByIdAndUpdate(id, { $set: { ...group } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteGroup: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { groupModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    groupModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
