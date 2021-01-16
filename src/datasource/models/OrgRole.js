import mongoose from 'mongoose'

const Schema = mongoose.Schema
const orgRoleSchema = new Schema({
    userId: { type: String, required: true },
    role: { type: String, required: true },   // owner | member | guest | client

    status: { type: Number, default: 1 },   // 0: Blocked | 1: Normal
}, { _id: false, timestamps: false })

module.exports = orgRoleSchema
