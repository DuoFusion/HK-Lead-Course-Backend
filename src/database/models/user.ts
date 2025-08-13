const mongoose = require('mongoose')

const userSchema: any = new mongoose.Schema({
    name : {type  : String},
    email: { type: String, required: true },
    phoneNumber: { type: String},
    password: { type: String },
    profilePhoto : {type : String},
    userType: { type: String, default: "user" },
   isActive: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema);