import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        tenant: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { tenantModel } }, ) => {
                const entity = await tenantModel.findById({ _id: id }).exec()
                return entity
            }),
        tenants: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { tenantModel } }, ) => {
                if(id){
                    const ret = await tenantModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ name: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await tenantModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createTenant: combineResolvers(
            isAuthenticated,
            async (parent, { tenant }, { models: { tenantModel } }, ) => {
                // console.log('createTenant', tenant)
                const newTenant = await new tenantModel(tenant)

                return new Promise((resolve, reject) => {
                    newTenant.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateTenant: combineResolvers(
            isAuthenticated,
            async (parent, { id, tenant }, { models: { tenantModel } }, ) => {
                // console.log('updateTenant', id, tenant)
                return new Promise((resolve, reject) => {
                    tenantModel.findByIdAndUpdate(id, { $set: { ...tenant } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteTenant: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { tenantModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    tenantModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
