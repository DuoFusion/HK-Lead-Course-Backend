var mongoose = require('mongoose')

const heroSectionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    Subheading: { type: String },
    cta: { type: String },
    image: { type: String },
    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

export const heroSectionModel = mongoose.model('hero-section', heroSectionSchema);