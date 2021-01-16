import mongoose from 'mongoose'

const Schema = mongoose.Schema
const videoSchema = new Schema({
    title: { type: String, required: true },
    path: String,
    cover_path: String,
    play_location: String,
    status: { type: Number, default: 1 },

    // meta info
    seconds: Number,
    width: Number,
    height: Number,
    tags: String,
}, { timestamps: true })

videoSchema.index({ 'title': 1 })
videoSchema.index({ 'tags': 1 })
videoSchema.index({ 'status': 1 })

const ZVideo = mongoose.model('video', videoSchema)
module.exports = ZVideo
