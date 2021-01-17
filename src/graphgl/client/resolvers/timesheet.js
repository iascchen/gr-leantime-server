import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        timesheet: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { timesheetModel } }, ) => {
                const entity = await timesheetModel.findById({ _id: id }).exec()
                return entity
            }),
        timesheets: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { timesheetModel } }, ) => {
                if(id){
                    const ret = await timesheetModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await timesheetModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createTimesheet: combineResolvers(
            isAuthenticated,
            async (parent, { timesheet }, { models: { timesheetModel } }, ) => {
                // console.log('createTimesheet', timesheet)
                const newTimesheet = await new timesheetModel(timesheet)

                return new Promise((resolve, reject) => {
                    newTimesheet.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateTimesheet: combineResolvers(
            isAuthenticated,
            async (parent, { id, timesheet }, { models: { timesheetModel } }, ) => {
                // console.log('updateTimesheet', id, timesheet)
                return new Promise((resolve, reject) => {
                    timesheetModel.findByIdAndUpdate(id, { $set: { ...timesheet } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteTimesheet: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { timesheetModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    timesheetModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
