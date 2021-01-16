import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import {ApolloServer, AuthenticationError} from 'apollo-server-express'
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import {ACCOUNT_CENTER_API, HEADER_FOR_AUTH, DB_URI, SESSION_SECRET} from './utils/secrets'
import {models} from './datasource'
import clientTypeDefs from './graphgl/client/types'
import clientResolvers from './graphgl/client/resolvers'
import adminTypeDefs from './graphgl/admin/types'
import adminResolvers from './graphgl/admin/resolvers'

// Create Express server
const app = express()

// Connect to MongoDB
const mongoUrl = DB_URI
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('MongoDB connection ok. ')
    },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    // process.exit();
})

// Express configuration
app.set('port', process.env.PORT || 10000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

/********************
 * Apollo Gateway for Account Center
 ********************/

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        if (context.token) {
            request.http.headers.set(HEADER_FOR_AUTH, context.token)
        }
    }
    // didReceiveResponse({ response, request, context }) {
    //     console.log(response)
    //     return response
    // }
}
const gateway = new ApolloGateway({
    apq: true,
    serviceList: [
        { name: 'login', url: ACCOUNT_CENTER_API },
    ],
    buildService({ url }) {
        return new AuthenticatedDataSource({ url })
    },
    debug: true
})

const accountServer = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => {
        const token = req.headers[HEADER_FOR_AUTH] || null
        return { token }
    }
})
accountServer.applyMiddleware({ app, path: '/login' })

const getUser = async (req) => {
    const token = req.headers[HEADER_FOR_AUTH]
    console.log('getUser token', token)

    if (token) {
        try {
            return await jwt.verify(token, SESSION_SECRET)
        } catch (e) {
            throw new AuthenticationError('Your session expired. Sign in again.')
        }
    }
}

/********************
 * Apollo Server for admin
 ********************/

const adminServer = new ApolloServer({
    typeDefs: adminTypeDefs,
    resolvers: adminResolvers,
    context: async ({ req }) => {
        if (req) {
            const me = await getUser(req)
            return {
                me,
                models,
            }
        }
    },
})
adminServer.applyMiddleware({ app, path: '/admin' })

/********************
 * Apollo Server for client
 ********************/

const clientServer = new ApolloServer({
    typeDefs: clientTypeDefs,
    resolvers: clientResolvers,
    context: async ({ req }) => {
        if (req) {
            const me = await getUser(req)
            return {
                me,
                models,
            }
        }
    },
})
clientServer.applyMiddleware({ app, path: '/api' })

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('  🚀 Account Login API is running at http://localhost:%d%s in %s mode', app.get('port'), accountServer.graphqlPath,
        app.get('env'))
    console.log('  🚀 API Server is running at http://localhost:%d%s in %s mode', app.get('port'), clientServer.graphqlPath,
        app.get('env'))
    console.log('  🚀 Admin Server is running at http://localhost:%d%s in %s mode', app.get('port'), adminServer.graphqlPath,
        app.get('env'))

    console.log('  Press CTRL-C to stop\n')
})

