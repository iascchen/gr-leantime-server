import mongoose from 'mongoose'

const Schema = mongoose.Schema
const punchClockSchema = new Schema({
    userId: { type: String, required: true },
}, { timestamps: true })

punchClockSchema.index({ 'userId': 1 })

const PunchClock = mongoose.model('punch-clock', punchClockSchema)
module.exports = PunchClock
