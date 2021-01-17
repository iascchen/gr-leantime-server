import mongoose from 'mongoose'

const Schema = mongoose.Schema
const canvasSchema = new Schema({
    title: { type: String, required: true },
    projectId: { type: String, required: true },
    authorId: { type: String, required: true },
    type: { type: String, required: true }, // leancanvas, retrospective, idea

    canvasItemIds: [String],

    status: { type: Number, default: 1 },
}, { timestamps: true })

canvasSchema.index({ 'title': 1 })
canvasSchema.index({ 'authorId': 1 })
canvasSchema.index({ 'projectId': 1 })
canvasSchema.index({ 'type': 1 })
canvasSchema.index({ 'status': 1 })

const Canvas = mongoose.model('canvas', canvasSchema)
module.exports = Canvas
