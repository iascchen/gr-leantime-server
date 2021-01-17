import mongoose from 'mongoose'
import repeatRuleSchema from './RepeatRule'

const Schema = mongoose.Schema
const calendarSchema = new Schema({
    ownerId: { type: String, required: true },
    invitedIds: [String],

    start: { type: Date, required: true },
    end:  { type: Date, required: true },
    desc: String,

    allDay: Boolean,
    repeatRule: repeatRuleSchema,

    status: { type: Number, default: 1 },
}, { timestamps: true })

calendarSchema.index({ 'userId': 1 })
calendarSchema.index({ 'status': 1 })

const Calendar = mongoose.model('calendar', calendarSchema)
module.exports = Calendar
