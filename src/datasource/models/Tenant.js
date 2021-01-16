import mongoose from 'mongoose'
import orgRoleSchema from './OrgRole'

const Schema = mongoose.Schema
const tenantSchema = new Schema({
    siteName: { type: String, required: true },
    slug: String,   // http://host/t/%slug% as site url
    desc: String,

    language: { type: String, default: 'zh-CN' },
    timeZone: { type: String, default: '+8:00' },

    mainColor: String,
    logoPath: String,

    ownerId: { type: String, required: true },
    members: [orgRoleSchema],   // tenantOwner | groupOwner | projectOwner | member | client |

    status: { type: Number, default: 1 },   // 0: disabled, 1: normal, 2: locked or archived
}, { timestamps: true })

tenantSchema.index({ 'siteName': 1 })
tenantSchema.index({ 'slug': 1 })
tenantSchema.index({ 'ownerId': 1 })
tenantSchema.index({ 'status': 1 })

const Tenant = mongoose.model('tenant', tenantSchema)
module.exports = Tenant

export const adminTenant = {
    siteName: '/admin',
    slug: 'admin',
    desc: 'System Supervisor',
    logoPath: null,

    ownerId: '1',   // user id in table.User

    language: 'zh-CN',
    timeZone: '+8:00',

    mainColor: '1b75bb',
    theme: 'default',
}
