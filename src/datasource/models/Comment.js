import mongoose from 'mongoose'

const Schema = mongoose.Schema
const commentSchema = new Schema({

    // canvasItem: retrospective | idea | leanCanvas
    // ticket: milestone | task | story | bug | subtask
    // report
    module: { type: String, required: true },

    moduleId: { type: String, required: true },
    authorId: { type: String, required: true },

    commentParent: String, // commentId
    text: String,   // Markdown

    status: { type: Number, default: 1 },   // 0: disable, 1: normal, 2: blocked
})

commentSchema.index({ 'module': 1, 'moduleId': 1 })
commentSchema.index({ 'authorId': 1 })
commentSchema.index({ 'commentParent': 1 })

const Comment = mongoose.model('comment', commentSchema)
module.exports = Comment
