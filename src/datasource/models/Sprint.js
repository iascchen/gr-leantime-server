import mongoose from 'mongoose'

const Schema = mongoose.Schema
const sprintSchema = new Schema({
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    start: Date,
    end: Date,

    planedSnapshot: [String],   // ticketIds and state at sprint begin
    ticketIds: [String],
    retrospectiveId: String,  // 冲刺回顾 CanvasId

    status: { type: Number, default: 1 },   // 0: new, 1: started, 2: archived
}, { timestamps: true })

sprintSchema.index({ 'projectId': 1 })
sprintSchema.index({ 'name': 1 })
sprintSchema.index({ 'status': 1 })

const Sprint = mongoose.model('sprint', sprintSchema)
module.exports = Sprint
