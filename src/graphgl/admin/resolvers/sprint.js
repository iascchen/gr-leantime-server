import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        sprint: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { sprintModel } }, ) => {
                const entity = await sprintModel.findById({ _id: id }).exec()
                return entity
            }),
        sprints: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { sprintModel } }, ) => {
                if(id){
                    const ret = await sprintModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await sprintModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createSprint: combineResolvers(
            isAuthenticated,
            async (parent, { sprint }, { models: { sprintModel } }, ) => {
                // console.log('createSprint', sprint)
                const newEntity = await new sprintModel(sprint)

                return new Promise((resolve, reject) => {
                    newEntity.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateSprint: combineResolvers(
            isAuthenticated,
            async (parent, { id, sprint }, { models: { sprintModel } }, ) => {
                // console.log('updateSprint', id, sprint)
                return new Promise((resolve, reject) => {
                    sprintModel.findByIdAndUpdate(id, { $set: { ...sprint } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteSprint: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { sprintModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    sprintModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
