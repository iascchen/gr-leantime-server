import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        calendar: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { calendarModel } }, ) => {
                const entity = await calendarModel.findById({ _id: id }).exec()
                return entity
            }),
        calendars: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { calendarModel } }, ) => {
                if(id){
                    const ret = await calendarModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await calendarModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createCalendar: combineResolvers(
            isAuthenticated,
            async (parent, { calendar }, { models: { calendarModel } }, ) => {
                // console.log('createCalendar', calendar)
                const newEntity = await new calendarModel(calendar)

                return new Promise((resolve, reject) => {
                    newEntity.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateCalendar: combineResolvers(
            isAuthenticated,
            async (parent, { id, calendar }, { models: { calendarModel } }, ) => {
                // console.log('updateCalendar', id, calendar)
                return new Promise((resolve, reject) => {
                    calendarModel.findByIdAndUpdate(id, { $set: { ...calendar } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteCalendar: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { calendarModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    calendarModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
