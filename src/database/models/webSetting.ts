var mongoose = require('mongoose')

const webSettingSchema = new mongoose.Schema({
    
    email :{ type: String},
    phoneNumber: { type: Number},
    whatsappNumber: { type: Number},
    whatsappMessage : { type: String},
    address : { type: String},
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        whatsapp: { type: String },
        linkedin: { type: String }
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false })

export const webSettingModel = mongoose.model('profileSetting', webSettingSchema);