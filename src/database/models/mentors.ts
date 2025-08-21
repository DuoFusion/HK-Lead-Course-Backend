var mongoose = require('mongoose')

const mentorsSchema = new mongoose.Schema({

    image: { type: String },
    name: { type: String },
    role: { type: String },
    experience: { type: String },

    socialMedia: {
        instagram: { type: String },
        linkedin: { type: String },
        facebook: { type: String },
        x: { type: String }
    },

    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });




export const mentorsModel = mongoose.model('mentors', mentorsSchema);