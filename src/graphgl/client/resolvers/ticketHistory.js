import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
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
    }
}
