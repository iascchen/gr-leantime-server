import mongoose from 'mongoose'
import contactSchema from './Contact'

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: { type: String, required: true },
    role: { type: String, default: 'user' },    // admin | tenantAdmin | customerCare | user
    displayName: String,
    avatar: String,

    contact: contactSchema,

    lastLogin: Date,
    lastLoginFrom: String,   // accountCenter, ldap, wechat, ...
    session: String,
    sessionTime: Number,

    expires: Date,
    notifications: Boolean,

    status: { type: Number, default: 1 },
}, { timestamps: true })

userSchema.index({ 'username': 1 })
userSchema.index({ 'tenantId': 1 })
userSchema.index({ 'status': 1 })

const User = mongoose.model('user', userSchema)
module.exports = User

export const admin = [
    {
        username: 'admin',
        displayName: 'GR Leantime Admin', // supervisor
        avatar: null,

        role: 'admin',  // admin | tenantAdmin | customerCare | user

        loginFrom: 'accountCenter',   // accountCenter, ldap, wechat, alipay
        contact: { mobile: '13910846609' },

        lastLogin: null,
        session: null,
        sessionTime: -1,

        expires: null,
        notifications: false,

        status: 1,
    },{
        username: 'tenantAdmin',    // create, approve, or manage all tenant account
        displayName: 'GR Leantime Tenant Admin',
        avatar: null,

        role: 'tenantAdmin',  // admin | tenantAdmin | customerCare | user

        loginFrom: 'accountCenter',   // accountCenter, ldap, wechat, alipay
        contact: { email: 'iasc@163.com' },

        lastLogin: null,
        session: null,
        sessionTime: -1,

        expires: null,
        notifications: false,

        status: 1,
    }
]
