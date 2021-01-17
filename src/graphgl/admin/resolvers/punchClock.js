import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        punchClock: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { punchClockModel } }, ) => {
                const entity = await punchClockModel.findById({ _id: id }).exec()
                return entity
            }),
    },
    Mutation: {
        createPunchClock: combineResolvers(
            isAuthenticated,
            async (parent, { punchClock }, { models: { punchClockModel } }, ) => {
                // console.log('createPunchClock', punchClock)
                const newpunchClock = await new punchClockModel(punchClock)

                return new Promise((resolve, reject) => {
                    newpunchClock.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        deletePunchClock: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { punchClockModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    punchClockModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
