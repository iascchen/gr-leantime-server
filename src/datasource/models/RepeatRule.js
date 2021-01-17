import mongoose from 'mongoose'

const Schema = mongoose.Schema
const repeatRuleSchema = new Schema({
    calendarId: { type: String, required: true },
    interval: { type: String, required: true },   // day | week | month | year
    value: { type: [String], required: true },  // ['08:00',] , ['monday',], ['30 08:00', ] , ['1231 08:00', ]
}, { _id: false, timestamps: false })

module.exports = repeatRuleSchema
