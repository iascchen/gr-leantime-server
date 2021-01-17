import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ticketSchema = new Schema({
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true }, // milestone, story, task, bug, subtask
    desc: String,

    dependingIds: [String],  // TicketId for Milestone
    state: String,  // new, backlog, doing, testing,

    milestoneId: String,
    milestoneSort:Number,
    sprintId: String,
    sprintSort:Number,

    canvasId: String,   // 相关的 Canvas

    tags: [String],
    priority: Number, // 1: 重要且紧急，2：紧急， 3： 重要不紧急， 4：其他
    color: String,

    ownerId: String,    // UserId
    assignToId : String,    // UserId

    planStart: Date,
    planEnd: Date,
    start: Date,
    end: Date,

    storyPoints: Number, // XS 1, S 2, M 3, L 5, XL 8, XXL 13

    planHours: Number,
    recordedHours: Number,
    remainHour: Number,

    status: { type: Number, default: 1 },
}, { timestamps: true })

ticketSchema.index({ 'title': 1 })
ticketSchema.index({ 'tags': 1 })
ticketSchema.index({ 'status': 1 })

const Ticket = mongoose.model('ticket', ticketSchema)
module.exports = Ticket
