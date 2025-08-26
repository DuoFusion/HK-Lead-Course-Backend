

const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema({
    email: { type: String },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false })

export const newsLetterModel = mongoose.model('newsletter', newsletterSchema);