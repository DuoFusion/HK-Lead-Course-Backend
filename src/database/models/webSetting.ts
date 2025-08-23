var mongoose = require('mongoose')

const webSettingSchema = new mongoose.Schema({
    
    email :{ type: String},
    phoneNumber: { type: String},
    whatsappNumber: { type: String},
    message : { type: String},
    address : { type: String},
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        whatsapp: { type: String },
        LinkdIn: { type: String }
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false })

export const webSettingModel = mongoose.model('profileSetting', webSettingSchema);