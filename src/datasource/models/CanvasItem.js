import mongoose from 'mongoose'

const Schema = mongoose.Schema
const canvasItemSchema = new Schema({
    canvasId: { type: String, required: true },
    title: { type: String, required: true },
    ownerId: { type: String, required: true },

    assumption: String,
    data: String,
    conclusion: String,

    box: String,
    state: String,
    color: String,

    milestoneId: String,
}, { timestamps: true })

canvasItemSchema.index({ 'canvasId': 1 })
canvasItemSchema.index({ 'title': 1 })
canvasItemSchema.index({ 'ownerId': 1 })
canvasItemSchema.index({ 'milestoneId': 1 })

const CanvasItem = mongoose.model('canvas-item', canvasItemSchema)
module.exports = CanvasItem
