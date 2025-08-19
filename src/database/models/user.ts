var mongoose = require('mongoose')

const userSchema: any = new mongoose.Schema({
    firstName : {type  : String},
    lastName : {type  : String},
    email: { type: String, required: true },
    phoneNumber: { type: String},
    password: { type: String },
    profilePhoto : {type : String},
    userType: { type: String, default: "user" },
   isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true , versionKey: false })

export const userModel = mongoose.model('user', userSchema);