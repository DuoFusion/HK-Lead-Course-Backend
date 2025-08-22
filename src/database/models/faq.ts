var mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    priority: { type: Number, default: 1 },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false });

export const faqModel = mongoose.model('faq', faqSchema);