var mongoose = require('mongoose')

const leadFormSchema = new mongoose.Schema({

    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, trim: true },

    // Interest (multiple bhi ho sake)
    interest: [{ type: String, trim: true }], // Example: ["Web Development", "AI", "Cloud"]

    // Learning Mode (enum for fixed options)
    preferredLearningMode: {
        type: String,
        enum: ["Online", "Offline", "Hybrid"],
        default: "Online"
    },
    background: { type: String, trim: true },          // e.g., "Engineering", "Commerce"
    itKnowledgeLevel: { type: String, trim: true },    // e.g., "Beginner", "Intermediate", "Advanced"
    additionalMessage: { type: String, trim: true },

    isDeleted: { type: Boolean, default: false }
})

export const leadFormModel = mongoose.model('leadForm', leadFormSchema);