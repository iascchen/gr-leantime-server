import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        ticket: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { ticketModel } }, ) => {
                const entity = await ticketModel.findById({ _id: id }).exec()
                return entity
            }),
        tickets: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { ticketModel } }, ) => {
                if(id){
                    const ret = await ticketModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await ticketModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createTicket: combineResolvers(
            isAuthenticated,
            async (parent, { ticket }, { models: { ticketModel } }, ) => {
                // console.log('createTicket', ticket)
                const newTicket = await new ticketModel(ticket)

                return new Promise((resolve, reject) => {
                    newTicket.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateTicket: combineResolvers(
            isAuthenticated,
            async (parent, { id, ticket }, { models: { ticketModel } }, ) => {
                // console.log('updateTicket', id, ticket)
                return new Promise((resolve, reject) => {
                    ticketModel.findByIdAndUpdate(id, { $set: { ...ticket } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteTicket: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { ticketModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    ticketModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
