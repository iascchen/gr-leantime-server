import mongoose from 'mongoose'

const Schema = mongoose.Schema
const messageSchema = new Schema({
    fromId: { type: String, required: true },   // user
    toId: { type: String, required: true },     // user

    subject: { type: String, required: true },
    content: String,    // Markdown

    module: String,
    moduleId: String,

    read: Boolean,

    status: { type: Number, default: 1 },   // 0: disable, 1: normal, 2: blocked
})

messageSchema.index({ 'module': 1, 'moduleId': 1 })
messageSchema.index({ 'fromId': 1 })
messageSchema.index({ 'toId': 1 })
messageSchema.index({ 'status': 1 })

const Message = mongoose.model('message', messageSchema)
module.exports = Message
