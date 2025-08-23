var mongoose = require('mongoose')

const profileSettingSchema = new mongoose.Schema({
    name: { type: String},
    email :{ type: String},
    phoneNumber: { type: String},
    whatsappNumber: { type: String},
    message : { type: String},
    address : { type: String},
    profileImage : { type: String},
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        whatsapp: { type: String },
        LinkdIn: { type: String }
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false })

export const profileSettingModel = mongoose.model('profileSetting', profileSettingSchema);