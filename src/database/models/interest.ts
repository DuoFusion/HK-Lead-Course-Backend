var mongoose = require('mongoose')

const interestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }

}, { timestamps: true, versionKey: false })

export const interestModel = mongoose.model('interest', interestSchema);