import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        sysRole: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { sysRoleModel } }, ) => {
                const entity = await sysRoleModel.findById({ _id: id }).exec()
                return entity
            }),
        sysRoles: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { sysRoleModel } }, ) => {
                if(id){
                    const ret = await sysRoleModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ roleName: { '$regex': keywords } }, { desc: { '$regex': keywords } },] }
                        : {}

                    return await sysRoleModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createSysRole: combineResolvers(
            isAuthenticated,
            async (parent, { sysRole }, { models: { sysRoleModel } }, ) => {
                // console.log('createSysRole', sysRole)
                const newSysRole = await new sysRoleModel(sysRole)

                return new Promise((resolve, reject) => {
                    newSysRole.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateSysRole: combineResolvers(
            isAuthenticated,
            async (parent, { id, sysRole }, { models: { sysRoleModel } }, ) => {
                // console.log('updateSysRole', id, sysRole)
                return new Promise((resolve, reject) => {
                    sysRoleModel.findByIdAndUpdate(id, { $set: { ...sysRole } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteSysRole: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { sysRoleModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    sysRoleModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
