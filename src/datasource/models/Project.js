import mongoose from 'mongoose'
import contactSchema from './Contact'
import orgRoleSchema from './OrgRole'

const Schema = mongoose.Schema
const projectSchema = new Schema({
    name: { type: String, required: true },
    tenantId: { type: String, required: true },
    groupId: String,
    slug: { type: [String], required: true }, // = %tenantSlug%/%projectSlug% ; http://host/p/%slug%
    desc: String,

    clientId: { type: String, required: true },
    clientContact: contactSchema,
    hourBudget: String,
    dollarBudget: Number,

    ownerId: { type: String, required: true },
    members: [orgRoleSchema], // projectOwner | member | client

    visible: { type: Number, default: 1 }, // 1: user, 2: group, 3: tenant, 4: public
    status: { type: Number, default: 1 },   // 0: disabled, 1: normal, 2: locked or archived
}, { timestamps: true })

projectSchema.index({ 'tenantId': 1 })
projectSchema.index({ 'slug': 1 })
projectSchema.index({ 'clientId': 1 })
projectSchema.index({ 'ownerId': 1 })
projectSchema.index({ 'visible': 1 })
projectSchema.index({ 'status': 1 })

const Project = mongoose.model('project', projectSchema)
module.exports = Project
