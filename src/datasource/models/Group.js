import mongoose from 'mongoose'
import OrgRole from './OrgRole'

const Schema = mongoose.Schema
const groupSchema = new Schema({
    name: { type: String, required: true },
    desc: String,

    ownerId: { type: String, required: true },
    members: [OrgRole], // groupOwner | projectOwner | member | client

    status: { type: Number, default: 1 },
}, { timestamps: true })

groupSchema.index({ 'name': 1 })
groupSchema.index({ 'ownerId': 1 })
groupSchema.index({ 'status': 1 })

const Group = mongoose.model('group', groupSchema)
module.exports = Group
