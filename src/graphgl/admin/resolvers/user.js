import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        user: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { userModel } }, ) => {
                const entity = await userModel.findById({ _id: id }).exec()
                return entity
            }),
        users: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { userModel } }, ) => {
                if(id){
                    const ret = await userModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ title: { '$regex': keywords } }, { tags: { '$regex': keywords } },] }
                        : {}

                    return await userModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createUser: combineResolvers(
            isAuthenticated,
            async (parent, { user }, { models: { userModel } }, ) => {
                // console.log('createUser', user)
                const newUser = await new userModel(user)

                return new Promise((resolve, reject) => {
                    newUser.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateUser: combineResolvers(
            isAuthenticated,
            async (parent, { id, user }, { models: { userModel } }, ) => {
                // console.log('updateUser', id, user)
                return new Promise((resolve, reject) => {
                    userModel.findByIdAndUpdate(id, { $set: { ...user } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteUser: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { userModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    userModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
