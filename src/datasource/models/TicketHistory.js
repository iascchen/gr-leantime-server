import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ticketHistorySchema = new Schema({
    ticketId: { type: String, required: true },
    editorId: { type: String, required: true },
    changeOp: String,
    changeValue: String,
}, { timestamps: true })

ticketHistorySchema.index({ 'ticketId': 1 })
ticketHistorySchema.index({ 'editorId': 1 })

const TicketHistory = mongoose.model('ticket-history', ticketHistorySchema)
module.exports = TicketHistory
