import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        report: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { reportModel } }, ) => {
                const entity = await reportModel.findById({ _id: id }).exec()
                return entity
            }),
        reports: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { reportModel } }, ) => {
                if(id){
                    const ret = await reportModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await reportModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createReport: combineResolvers(
            isAuthenticated,
            async (parent, { report }, { models: { reportModel } }, ) => {
                // console.log('createReport', report)
                const newReport = await new reportModel(report)

                return new Promise((resolve, reject) => {
                    newReport.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateReport: combineResolvers(
            isAuthenticated,
            async (parent, { id, report }, { models: { reportModel } }, ) => {
                // console.log('updateReport', id, report)
                return new Promise((resolve, reject) => {
                    reportModel.findByIdAndUpdate(id, { $set: { ...report } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteReport: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { reportModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    reportModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
