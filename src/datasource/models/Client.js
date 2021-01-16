import mongoose from 'mongoose'
import orgRoleSchema from './OrgRole'

const Schema = mongoose.Schema
const clientSchema = new Schema({
    name: { type: String, required: true },
    tenantId: { type: String, required: true },
    desc: String,

    members: [orgRoleSchema], // client

    status: { type: Number, default: 1 },   // 0: disabled, 1: normal, 2: locked or archived
}, { timestamps: true })

clientSchema.index({ 'name': 1 })
clientSchema.index({ 'tenantId': 1 })
clientSchema.index({ 'status': 1 })

const Client = mongoose.model('client', clientSchema)
module.exports = Client
