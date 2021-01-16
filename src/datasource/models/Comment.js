import mongoose from 'mongoose'

const Schema = mongoose.Schema
const commentSchema = new Schema({
    moduleId: { type: String, required: true },
    userId: { type: String, required: true },

    commentParent: String,
    text: String,

    status: { type: Number, default: 1 },
})

commentSchema.index({ 'moduleId': 1 })
commentSchema.index({ 'userId': 1 })
commentSchema.index({ 'commentParent': 1 })
commentSchema.index({ 'text': 1 })

const Comment = mongoose.model('comment', commentSchema)
module.exports = Comment
