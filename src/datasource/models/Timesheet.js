import mongoose from 'mongoose'

const Schema = mongoose.Schema
const timesheetSchema = new Schema({
    userId: { type: String, required: true },
    ticketId: { type: String, required: true },
    workDate: Date,
    hours: Number,
    desc: String,

    type: String,

    status: { type: Number, default: 1 },
}, { timestamps: true })

timesheetSchema.index({ 'userId': 1 })
timesheetSchema.index({ 'ticketId': 1 })
timesheetSchema.index({ 'status': 1 })

const Timesheet = mongoose.model('timesheet', timesheetSchema)
module.exports = Timesheet
