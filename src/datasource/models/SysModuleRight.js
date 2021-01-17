import mongoose from 'mongoose'

const Schema = mongoose.Schema
const sysModuleRightSchema = new Schema({
    module: { type: String, required: true, unique: true },     // Route URL regex
    roles: { type: [String], required: true },    // sysRole.roleName
}, { timestamps: false })

sysModuleRightSchema.index({ 'module': 1 })

const SysModuleRight = mongoose.model('sys-module-right', sysModuleRightSchema)
module.exports = SysModuleRight
