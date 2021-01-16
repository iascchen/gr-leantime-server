import mongoose from 'mongoose'

const Schema = mongoose.Schema
const sysRoleSchema = new Schema({
    roleName: { type: String, required: true, unique: true }, // admin | tenantAdmin | customerCare | user
    desc: String,
}, { _id: false, timestamps: false })

sysRoleSchema.index({ 'roleName': 1 })

const SysRole = mongoose.model('sys-role', sysRoleSchema)
module.exports = SysRole
