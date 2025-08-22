var mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    aboutUs: { type: String, required: true },
    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }

},{timestamps: true, versionKey: false});

export const aboutModel = mongoose.model('about', aboutSchema)