import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        ticketHistory: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { ticketHistoryModel } }, ) => {
                const entity = await ticketHistoryModel.findById({ _id: id }).exec()
                return entity
            }),
        ticketHistories: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { ticketHistoryModel } }, ) => {
                if(id){
                    const ret = await ticketHistoryModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await ticketHistoryModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createTicketHistory: combineResolvers(
            isAuthenticated,
            async (parent, { ticketHistory }, { models: { ticketHistoryModel } }, ) => {
                // console.log('createTicketHistory', ticketHistory)
                const newTicketHistory = await new ticketHistoryModel(ticketHistory)

                return new Promise((resolve, reject) => {
                    newTicketHistory.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateTicketHistory: combineResolvers(
            isAuthenticated,
            async (parent, { id, ticketHistory }, { models: { ticketHistoryModel } }, ) => {
                // console.log('updateTicketHistory', id, ticketHistory)
                return new Promise((resolve, reject) => {
                    ticketHistoryModel.findByIdAndUpdate(id, { $set: { ...ticketHistory } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteTicketHistory: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { ticketHistoryModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    ticketHistoryModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
