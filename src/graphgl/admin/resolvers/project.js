import {combineResolvers} from 'graphql-resolvers'

import {isAuthenticated} from '../../common/resolvers/authorization'

export default {
    Query: {
        project: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { projectModel } }, ) => {
                const entity = await projectModel.findById({ _id: id }).exec()
                return entity
            }),
        projects: combineResolvers(
            isAuthenticated,
            async (parent, {limit, skip, id, keywords}, { models: { projectModel } }, ) => {
                if(id){
                    const ret = await projectModel.findById(id).populate().exec()
                    return [ret]
                } else {
                    const query = keywords
                        ? { $or: [{ siteName: { '$regex': keywords } }, { desc: { '$regex': keywords } },
                            { slug: { '$regex': keywords } }] }
                        : {}

                    return await projectModel.find(query).skip(skip).limit(limit).populate().exec()
                }
            }),
    },
    Mutation: {
        createProject: combineResolvers(
            isAuthenticated,
            async (parent, { project }, { models: { projectModel } }, ) => {
                // console.log('createProject', project)
                const newProject = await new projectModel(project)

                return new Promise((resolve, reject) => {
                    newProject.save((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
        updateProject: combineResolvers(
            isAuthenticated,
            async (parent, { id, project }, { models: { projectModel } }, ) => {
                // console.log('updateProject', id, project)
                return new Promise((resolve, reject) => {
                    projectModel.findByIdAndUpdate(id, { $set: { ...project } }, { new: true }).exec(
                        (err, res) => {
                            err ? reject(err) : resolve(res)
                        }
                    )
                })
            }),
        deleteProject: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models: { projectModel } }, ) => {
                return new Promise((resolve, reject) => {
                // findByIdAndRemove
                    projectModel.findByIdAndDelete(id).exec((err, res) => {
                        err ? reject(err) : resolve(res)
                    })
                })
            }),
    }
}
