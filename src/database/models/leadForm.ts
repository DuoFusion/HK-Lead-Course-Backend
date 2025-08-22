var mongoose = require('mongoose')

const leadFormSchema = new mongoose.Schema({

    fullName: { type: String },
    email: { type: String},
    address: { type: String},
    phone: { type: String},
    city: { type: String},

    // Interest (multiple bhi ho sake)
    interest: [{ type: String}], // Example: ["Web Development", "AI", "Cloud"]

    // Learning Mode (enum for fixed options)
    preferredLearningMode: {
        type: String,
        enum: ["Online", "Offline", "Hybrid"],
        default: "Online"
    },
    background: { type: String},          // e.g., "Engineering", "Commerce"
    itKnowledgeLevel: { type: String},    // e.g., "Beginner", "Intermediate", "Advanced"
    additionalMessage: { type: String},
    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });


export const leadFormModel = mongoose.model('leadForm', leadFormSchema);