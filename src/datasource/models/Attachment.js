import mongoose from 'mongoose'

const Schema = mongoose.Schema
const attachmentSchema = new Schema({
    module: { type: String, required: true },
    moduleId: { type: String, required: true },
    authorId: { type: String, required: true },     // user

    realName: { type: String, required: true },     // file name
    encodeName: String,     // hash of file, can be used for link same files
    extension: String,      // ext

    tags: [String],
    status: { type: Number, default: 1 },   // 0: disable, 1: normal, 2: blocked
}, { timestamps: true })

attachmentSchema.index({ 'module': 1, 'moduleId': 1 })
attachmentSchema.index({ 'authorId': 1 })
attachmentSchema.index({ 'status': 1 })

const Attachment = mongoose.model('attachment', attachmentSchema)
module.exports = Attachment
