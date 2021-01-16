import mongoose from 'mongoose'

const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: String,
    mobile: String,
    email: String,
    phone: String,
    internet: String,
    wechat: String,

    country: String,
    state: String,   // State or Province
    city: String,   // City
    address: String,   // diction and street
    zip: String,

    tags: [String],

    status: { type: Number, default: 1 },
}, { _id: false, timestamps: false })

contactSchema.index({ 'name': 1 })
contactSchema.index({ 'mobile': 1 })
contactSchema.index({ 'email': 1 })

module.exports = contactSchema
