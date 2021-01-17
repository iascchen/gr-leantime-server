import mongoose from 'mongoose'

const Schema = mongoose.Schema
const reportSchema = new Schema({
    authorId: { type: String, required: true },
    start: { type: Date, required: true },
    end:  { type: Date, required: true },

    subject: { type: String, required: true },
    content: String,    // Markdown

    planedSnapshot: [String],   // ticketIds and state at region begin
    ticketIds: [String],    // ticketIds and state at region end, please add comments to unfinished task

    status: { type: Number, default: 1 },   // 0:disable, 1: normal, 2: locked and archived
}, { timestamps: true })

reportSchema.index({ 'authorId': 1 })
reportSchema.index({ 'status': 1 })

const Report = mongoose.model('report', reportSchema)
module.exports = Report
