var mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
     type: { type: String, enum: ['hero', 'workshop'] },
    heading: { type: String, required: true },
    Subheading: { type: String },
    cta: { type: String },
    image: { type: String },
    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
      isBlocked: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

export const bannnerModel = mongoose.model('banners', bannerSchema);