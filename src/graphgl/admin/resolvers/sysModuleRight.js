import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        sysModuleRight: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { sysModuleRightModel } }, ) => {
                const entity = await sysModuleRightModel.findById({ _id: id }).exec()
                return entity
            }),
        sysModuleRights: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { sysModuleRightModel } }, ) => {
                if(id){
                    const ret = await sysModuleRightModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ ModuleRightName: { '$regex': keywords } }, { desc: { '$regex': keywords } },] }
                        : {}

                    return await sysModuleRightModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createSysModuleRight: combineResolvers(
            isAuthenticated,
            async (parent, { sysModuleRight }, { models: { sysModuleRightModel } }, ) => {
                // console.log('createSysModuleRight', sysModuleRight)
                const newSysModuleRight = await new sysModuleRightModel(sysModuleRight)

                return new Promise((resolve, reject) => {
                    newSysModuleRight.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateSysModuleRight: combineResolvers(
            isAuthenticated,
            async (parent, { id, sysModuleRight }, { models: { sysModuleRightModel } }, ) => {
                // console.log('updateSysModuleRight', id, sysModuleRight)
                return new Promise((resolve, reject) => {
                    sysModuleRightModel.findByIdAndUpdate(id, { $set: { ...sysModuleRight } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteSysModuleRight: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { sysModuleRightModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    sysModuleRightModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
